/// <reference types="node" />

import { BitReader } from "./bit-reader.js";

import type { BufferBits } from "./bit-reader.js";

export { BitReader } from "./bit-reader.js";

export type { BufferBits } from "./bit-reader.js";

export function nrv2eDecompress(input: Buffer, output: Buffer, bufferBits: BufferBits = 8): void {
  const bits = new BitReader(input, bufferBits);

  let outputPos = 0;
  let lastOffset = 1;

  while (!bits.ended) {
    if (bits.readBit() === 1) {
      // 1: copy next byte

      // Validate bounds to prevent buffer overflow
      if (outputPos >= output.length) {
        throw new Error(
          `Buffer overflow: output position exceeds buffer size (outputPos: ${outputPos}, bufferSize: ${output.length})`,
        );
      }

      output[outputPos++] = bits.readByte();
    } else {
      // 0: compression

      let offset = 1;
      let length = 0;

      for (;;) {
        offset = offset * 2 + bits.readBit();
        if (bits.readBit() === 1) {
          // ... > X > 1
          break;
        }
        // ... > X > 0 > X > ...
        offset = (offset - 1) * 2 + bits.readBit();
      }

      if (offset === 2) {
        // 0 > 0 > 1 > X: use last offset (and length from bit)
        offset = lastOffset;
        length = bits.readBit();
      } else {
        // 0 > 1 > 1 or 0 > X > 0 > ...: read length (high byte from bits and low byte from next byte)
        offset = (offset - 3) * 0x100 + bits.readByte();
        if (offset === 0xffffffff) {
          break;
        }
        // one bit of length in offset
        length = (offset ^ 0xffffffff) & 1;
        offset >>= 1;
        lastOffset = ++offset;
      }

      if (length) {
        length = 1 + bits.readBit();
      } else if (bits.readBit() === 1) {
        // ... > 1 > X
        length = 3 + bits.readBit();
      } else {
        // ... > 0 > X > 0 > ...
        length++;
        do {
          length = length * 2 + bits.readBit();
        } while (bits.readBit() === 0);
        length += 3;
      }

      if (offset > 0x500) {
        length++;
      }

      let currentPos = outputPos - offset;

      // Validate offset to prevent buffer overflow
      if (currentPos < 0 || offset > outputPos) {
        throw new Error(
          `Invalid offset: cannot reference data before current position (offset: ${offset}, outputPos: ${outputPos})`,
        );
      }

      for (let i = 0; i <= length; i++) {
        // Additional bounds checking to prevent buffer overflow
        if (outputPos >= output.length || currentPos >= output.length) {
          throw new Error(
            `Buffer overflow: output position exceeds buffer size (outputPos: ${outputPos}, currentPos: ${currentPos}, bufferSize: ${output.length})`,
          );
        }

        output[outputPos++] = output[currentPos++];
      }
    }
  }
}

export default nrv2eDecompress;
