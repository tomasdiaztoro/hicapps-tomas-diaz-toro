import validateType from "../../src/validators/validateType.js";

describe("validateType", () => {
  it("shouldn't throw an error if the type is right", () => {
    expect(() => validateType("test", "string", "foo")).not.toThrow();
    expect(() => validateType(123, "number", "foo")).not.toThrow();
    expect(() => validateType(true, "boolean", "foo")).not.toThrow();
  });

  it("should throw an error if the type is wrong", () => {
    expect(() => validateType("test", "number", "Test Variable"))
        .toThrow("Test Variable must be number");
    expect(() => validateType(123, "string", "Test Variable"))
        .toThrow("Test Variable must be string");
    expect(() => validateType(true, "string", "Test Variable"))
        .toThrow("Test Variable must be string");
  });
});
