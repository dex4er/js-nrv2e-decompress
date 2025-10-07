import { expect } from "chai";
import nrv2eDecompress from "../src/nrv2e-decompress.js";
import { And, Feature, Given, Scenario, Then, When } from "./lib/steps.js";

Feature("Test nrv2eDecompress security", () => {
  Scenario("Prevent buffer overflow with invalid offset", () => {
    let output: Buffer;
    let maliciousInput: Buffer;
    let error: Error | null = null;

    Given("small output buffer", () => {
      output = Buffer.alloc(5);
    });

    And("malicious input that causes negative offset", () => {
      // Create input that will cause offset > outputPos
      // This simulates a malicious compressed file
      maliciousInput = Buffer.from([
        0x80, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      ]);
    });

    When("decompress function is called with malicious input", () => {
      try {
        nrv2eDecompress(maliciousInput, output);
      } catch (e) {
        error = e as Error;
      }
    });

    Then("function should throw error about buffer overflow", () => {
      expect(error).to.not.be.null;
      expect(error?.message).to.include("Buffer overflow");
      expect(error?.message).to.include("output position exceeds buffer size");
    });
  });
});
