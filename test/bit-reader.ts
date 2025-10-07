import { expect } from "chai";
import BitReader from "../src/bit-reader.js";
import { And, Feature, Given, Scenario, Then, When } from "./lib/steps.js";

Feature("Test BitReader", () => {
  Scenario("Read bytes from BitReader with 8 bit buffer", () => {
    let bits: BitReader;
    let buffer: Buffer;
    let byte: number;

    Given("buffer with 4 bytes", () => {
      buffer = Buffer.from([1, 2, 3, 4]);
    });

    And("new BitReader object with 8 bit buffer", () => {
      bits = new BitReader(buffer, 8);
    });

    for (let n = 1; n <= 4; n++) {
      When(`reading #${n} byte`, () => {
        byte = bits.readByte();
      });

      Then(`#${n} byte is correct`, () => {
        expect(byte).to.equal(n);
      });
    }

    And(`cannot read more bits`, () => {
      return expect(bits.ended).to.be.true;
    });
  });

  Scenario("Read bits and bytes from BitReader with 8 bit buffer", () => {
    let bit: number;
    let bits: BitReader;
    let buffer: Buffer;
    let byte: number;

    Given("buffer with 4 bytes", () => {
      buffer = Buffer.from([1, 2, 3, 4]);
    });

    And("new BitReader object with 8 bit buffer", () => {
      bits = new BitReader(buffer, 8);
    });

    for (let n = 7; n >= 0; n--) {
      When(`reading #${n} bit`, () => {
        bit = bits.readBit();
      });

      Then(`#${n} bit is correct`, () => {
        expect(bit).to.equal((1 >> n) & 1);
      });
    }

    When(`reading #2 byte`, () => {
      byte = bits.readByte();
    });

    Then(`#2 byte is correct`, () => {
      expect(byte).to.equal(2);
    });

    for (let n = 7; n >= 0; n--) {
      When(`reading #${n} bit`, () => {
        bit = bits.readBit();
      });

      Then(`#${n} bit is correct`, () => {
        expect(bit).to.equal((3 >> n) & 1);
      });
    }

    When(`reading #4 byte`, () => {
      byte = bits.readByte();
    });

    Then(`#4 byte is correct`, () => {
      expect(byte).to.equal(4);
    });

    And(`cannot read more bits`, () => {
      return expect(bits.ended).to.be.true;
    });
  });

  Scenario("Read bytes from BitReader with 16 bit buffer", () => {
    let bits: BitReader;
    let buffer: Buffer;
    let byte: number;

    Given("buffer with 4 bytes", () => {
      buffer = Buffer.from([1, 2, 3, 4]);
    });

    And("new BitReader object with 16 bit buffer", () => {
      bits = new BitReader(buffer, 16);
    });

    for (let n = 1; n <= 4; n++) {
      When(`reading #${n} byte`, () => {
        byte = bits.readByte();
      });

      Then(`#${n} byte is correct`, () => {
        expect(byte).to.equal(n);
      });
    }

    And(`cannot read more bits`, () => {
      return expect(bits.ended).to.be.true;
    });
  });

  Scenario("Read bits and bytes from BitReader with 16 bit buffer", () => {
    let bit: number;
    let bits: BitReader;
    let buffer: Buffer;
    let byte: number;

    Given("buffer with 4 bytes", () => {
      buffer = Buffer.from([1, 2, 3, 4]);
    });

    And("new BitReader object with 16 bit buffer", () => {
      bits = new BitReader(buffer, 16);
    });

    for (let n = 15; n >= 0; n--) {
      When(`reading #${n} bit`, () => {
        bit = bits.readBit();
      });

      Then(`#${n} bit is correct`, () => {
        expect(bit).to.equal((0x0102 >> n) & 1);
      });
    }

    When(`reading #3 byte`, () => {
      byte = bits.readByte();
    });

    Then(`#3 byte is correct`, () => {
      expect(byte).to.equal(3);
    });

    When(`reading #4 byte`, () => {
      byte = bits.readByte();
    });

    Then(`#4 byte is correct`, () => {
      expect(byte).to.equal(4);
    });

    And(`cannot read more bits`, () => {
      return expect(bits.ended).to.be.true;
    });
  });

  Scenario("Read bytes from BitReader with 32 bit buffer", () => {
    let bits: BitReader;
    let buffer: Buffer;
    let byte: number;

    Given("buffer with 4 bytes", () => {
      buffer = Buffer.from([1, 2, 3, 4]);
    });

    And("new BitReader object with 32 bit buffer", () => {
      bits = new BitReader(buffer, 32);
    });

    for (let n = 1; n <= 4; n++) {
      When(`reading #${n} byte`, () => {
        byte = bits.readByte();
      });

      Then(`#${n} byte is correct`, () => {
        expect(byte).to.equal(n);
      });
    }

    And(`cannot read more bits`, () => {
      return expect(bits.ended).to.be.true;
    });
  });

  Scenario("Read bits and bytes from BitReader with 32 bit buffer", () => {
    let bit: number;
    let bits: BitReader;
    let buffer: Buffer;

    Given("buffer with 4 bytes", () => {
      buffer = Buffer.from([1, 2, 3, 4]);
    });

    And("new BitReader object with 32 bit buffer", () => {
      bits = new BitReader(buffer, 32);
    });

    for (let n = 31; n >= 0; n--) {
      When(`reading #${n} bit`, () => {
        bit = bits.readBit();
      });

      Then(`#${n} bit is correct`, () => {
        expect(bit).to.equal((0x01020304 >> n) & 1);
      });
    }

    And(`cannot read more bits`, () => {
      return expect(bits.ended).to.be.true;
    });
  });
});
