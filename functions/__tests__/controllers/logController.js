import {logEvent} from "../../src/controllers/logController.js";
import {createLog} from "../../src/repositories/logRepository.js";
import Log from "../../src/models/log.js";

jest.mock("../../src/repositories/logRepository.js");
// Date.now() mocked to prevent fails due to the log createdAt value
jest.spyOn(Date, "now").mockImplementation(() => 1640995200000);

describe("logEvent", () => {
  const req = {method: "POST", path: "/pacientes"};
  const res = {status: jest.fn().mockReturnThis(), send: jest.fn()};

  it("should call logRepository", async () => {
    await logEvent(req, res);
    const log = new Log("Acceso a endpoint POST /pacientes");

    expect(createLog).toHaveBeenCalledWith(log);
  });

  it("should handle errors", async () => {
    createLog.mockRejectedValue(new Error("Error creating log: Timeout"));
    await logEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Error creating log: Timeout");
  });
});
