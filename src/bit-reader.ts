/// <reference types="node" />

export type BufferBits = 8 | 16 | 32

export class BitReader {
  protected offset = 0
  protected currentBit = 0
  protected currentBuffer = 0

  constructor (protected buffer: Buffer, protected bufferBits: BufferBits = 8) {
    if (bufferBits !== 8 && bufferBits !== 16 && bufferBits !== 32) {
      throw new Error('bufferBits should be 8, 16 or 32')
    }
  }

  get ended (): boolean {
    return this.offset >= this.buffer.length && this.currentBit === 0
  }

  readBit (): number {
    if (this.currentBit === 0) {
      this.currentBuffer = 0
      for (let bufferByte = this.bufferBits / 8 - 1; bufferByte >= 0; bufferByte--) {
        this.currentBuffer += this.readByte() << 8 * bufferByte
      }
      this.currentBit = this.bufferBits
    }
    return ((this.currentBuffer >> --this.currentBit) & 1)
  }

  readByte (): number {
    return this.buffer.readUInt8(this.offset++)
  }
}

export default BitReader
