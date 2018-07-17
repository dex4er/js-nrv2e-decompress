/**
 * @class
 * @param {Buffer} buffer
 * @param {number} bufferBits
 */
class BitReader {
  constructor (buffer, bufferBits = 8) {
    if (bufferBits !== 8 && bufferBits !== 16 && bufferBits !== 32) {
      throw new Error('bufferBits should be 8, 16 or 32')
    }

    this.buffer = buffer
    this.bufferBits = bufferBits

    this.offset = 0
    this.currentBit = 0
    this.currentBuffer = 0
  }

  /**
   * @property {boolean} ended
   */
  get ended () {
    return this.offset >= this.buffer.length && this.currentBit === 0
  }

  /**
   * @returns {number}
   */
  readBit () {
    if (this.currentBit === 0) {
      this.currentBuffer = 0
      for (let bufferByte = this.bufferBits / 8 - 1; bufferByte >= 0; bufferByte--) {
        this.currentBuffer += this.readByte() << 8 * bufferByte
      }
      this.currentBit = this.bufferBits
    }
    return ((this.currentBuffer >> --this.currentBit) & 1)
  }

  /**
   * @returns {number}
   */
  readByte () {
    return this.buffer.readUInt8(this.offset++)
  }
}

BitReader.BitReader = BitReader

module.exports = BitReader
