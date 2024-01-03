import {createLog} from "../../src/repositories/logRepository.js";
import Log from "../../src/models/log.js";
import db from "../../src/configs/db.js";

jest.mock("../../src/configs/db.js");
// Date.now() mocked to prevent fails due to the log createdAt value
jest.spyOn(Date, "now").mockImplementation(() => 1640995200000);

describe("createLog", () => {
  const log = new Log("Test log");
  const dbPush = jest.fn();

  it("should call db with the right params", async () => {
    db.ref.mockReturnValue({push: dbPush});
    await createLog(log);

    expect(db.ref).toHaveBeenCalledWith("logs");
    expect(dbPush).toHaveBeenCalledWith(log);
  });

  it("should handle errors", async () => {
    dbPush.mockRejectedValue(new Error("Timeout"));
    db.ref.mockReturnValue({push: dbPush});

    await expect(createLog(log)).rejects.toThrow("Error creating log: Timeout");
  });
});
