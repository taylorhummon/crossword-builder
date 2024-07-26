import { describe, expect, it } from '@jest/globals';
import { buildClassString } from "../../utilities/css";

describe("buildClassString()", () => {
  const cssModule = {
    "red": "abc-red",
    "fish": "abc-fish",
    "blue": "abc-blue"
  };
  it("works correctly when all arguments are provided", () => {
    expect(
      buildClassString(
        cssModule,
        ["red", "blue"],
        ["red", "fish"]
      )
    ).toBe(
      "abc-red abc-blue red fish"
    );
  });
  it("works correctly when the last argument is omitted", () => {
    expect(
      buildClassString(
        cssModule,
        ["red", "blue"]
      )
    ).toBe(
      "abc-red abc-blue"
    );
  });
  it("works correctly when the middle argument is omitted", () => {
    expect(
      buildClassString(
        cssModule,
        undefined,
        ["red", "fish"]
      )
    ).toBe(
      "red fish"
    );
  });
  it("works correctly when the last two arguments are omitted", () => {
    expect(
      buildClassString(
        cssModule
      )
    ).toBe(
      ""
    );
  });
});
