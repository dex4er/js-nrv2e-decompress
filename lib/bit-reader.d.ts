/// <reference types="node" />

export type BufferBits = 8 | 16 | 32

export class BitReader {
  ended: boolean

  constructor (buffer: Buffer, bufferBits?: BufferBits)

  readBit (): number
  readByte (): number
}

export default BufferBits
