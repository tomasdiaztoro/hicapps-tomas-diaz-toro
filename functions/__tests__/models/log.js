import Log from "../../src/models/log.js";

const currentUnixTime = 1640995200000;
jest.spyOn(Date, "now").mockImplementation(() => currentUnixTime);

describe("Log", () => {
  it("should create a new Log instance", () => {
    const message = "Test message";
    const log = new Log(message);

    expect(log.createdAt).toBe(Math.floor(currentUnixTime / 1000));
    expect(log.message).toBe(message);
  });

  it("should throw an error if message is not a string or empty", () => {
    [false, undefined].forEach((value) => {
      expect(() =>
        new Log(value)).toThrow("message must be string");
    });
  });
});
