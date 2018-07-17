'use strict'

const t = require('tap')
require('tap-given')(t)

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()

const BitReader = require('../lib/bit-reader')

Feature('Test BitReader', () => {
  Scenario('Read bytes from BitReader with 8 bit buffer', () => {
    let bits
    let buffer
    let byte

    Given('buffer with 4 bytes', () => {
      buffer = Buffer.from([1, 2, 3, 4])
    })

    And('new BitReader object with 8 bit buffer', () => {
      bits = new BitReader(buffer, 8)
    })

    for (let n = 1; n <= 4; n++) {
      When(`reading #${n} byte`, () => {
        byte = bits.readByte()
      })

      Then(`#${n} byte is correct`, () => {
        byte.should.equal(n)
      })
    }

    And(`cannot read more bits`, () => {
      return bits.ended.should.be.true
    })
  })

  Scenario('Read bits and bytes from BitReader with 8 bit buffer', () => {
    let bit
    let bits
    let buffer
    let byte

    Given('buffer with 4 bytes', () => {
      buffer = Buffer.from([1, 2, 3, 4])
    })

    And('new BitReader object with 8 bit buffer', () => {
      bits = new BitReader(buffer, 8)
    })

    for (let n = 7; n >= 0; n--) {
      When(`reading #${n} bit`, () => {
        bit = bits.readBit()
      })

      Then(`#${n} bit is correct`, () => {
        bit.should.equal((1 >> n) & 1)
      })
    }

    When(`reading #2 byte`, () => {
      byte = bits.readByte()
    })

    Then(`#2 byte is correct`, () => {
      byte.should.equal(2)
    })

    for (let n = 7; n >= 0; n--) {
      When(`reading #${n} bit`, () => {
        bit = bits.readBit()
      })

      Then(`#${n} bit is correct`, () => {
        bit.should.equal((3 >> n) & 1)
      })
    }

    When(`reading #4 byte`, () => {
      byte = bits.readByte()
    })

    Then(`#4 byte is correct`, () => {
      byte.should.equal(4)
    })

    And(`cannot read more bits`, () => {
      return bits.ended.should.be.true
    })
  })

  Scenario('Read bytes from BitReader with 16 bit buffer', () => {
    let bits
    let buffer
    let byte

    Given('buffer with 4 bytes', () => {
      buffer = Buffer.from([1, 2, 3, 4])
    })

    And('new BitReader object with 16 bit buffer', () => {
      bits = new BitReader(buffer, 16)
    })

    for (let n = 1; n <= 4; n++) {
      When(`reading #${n} byte`, () => {
        byte = bits.readByte()
      })

      Then(`#${n} byte is correct`, () => {
        byte.should.equal(n)
      })
    }

    And(`cannot read more bits`, () => {
      return bits.ended.should.be.true
    })
  })

  Scenario('Read bits and bytes from BitReader with 16 bit buffer', () => {
    let bit
    let bits
    let buffer
    let byte

    Given('buffer with 4 bytes', () => {
      buffer = Buffer.from([1, 2, 3, 4])
    })

    And('new BitReader object with 16 bit buffer', () => {
      bits = new BitReader(buffer, 16)
    })

    for (let n = 15; n >= 0; n--) {
      When(`reading #${n} bit`, () => {
        bit = bits.readBit()
      })

      Then(`#${n} bit is correct`, () => {
        bit.should.equal((0x0102 >> n) & 1)
      })
    }

    When(`reading #3 byte`, () => {
      byte = bits.readByte()
    })

    Then(`#3 byte is correct`, () => {
      byte.should.equal(3)
    })

    When(`reading #4 byte`, () => {
      byte = bits.readByte()
    })

    Then(`#4 byte is correct`, () => {
      byte.should.equal(4)
    })

    And(`cannot read more bits`, () => {
      return bits.ended.should.be.true
    })
  })

  Scenario('Read bytes from BitReader with 32 bit buffer', () => {
    let bits
    let buffer
    let byte

    Given('buffer with 4 bytes', () => {
      buffer = Buffer.from([1, 2, 3, 4])
    })

    And('new BitReader object with 32 bit buffer', () => {
      bits = new BitReader(buffer, 32)
    })

    for (let n = 1; n <= 4; n++) {
      When(`reading #${n} byte`, () => {
        byte = bits.readByte()
      })

      Then(`#${n} byte is correct`, () => {
        byte.should.equal(n)
      })
    }

    And(`cannot read more bits`, () => {
      return bits.ended.should.be.true
    })
  })

  Scenario('Read bits and bytes from BitReader with 32 bit buffer', () => {
    let bit
    let bits
    let buffer

    Given('buffer with 4 bytes', () => {
      buffer = Buffer.from([1, 2, 3, 4])
    })

    And('new BitReader object with 32 bit buffer', () => {
      bits = new BitReader(buffer, 32)
    })

    for (let n = 31; n >= 0; n--) {
      When(`reading #${n} bit`, () => {
        bit = bits.readBit()
      })

      Then(`#${n} bit is correct`, () => {
        bit.should.equal((0x01020304 >> n) & 1)
      })
    }

    And(`cannot read more bits`, () => {
      return bits.ended.should.be.true
    })
  })
})
