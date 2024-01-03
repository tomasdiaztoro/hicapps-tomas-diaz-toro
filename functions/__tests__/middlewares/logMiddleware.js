import {logEvent} from "../../src/controllers/logController.js";
import logMiddleware from "../../src/middlewares/logMiddleware.js";

jest.mock("../../src/controllers/logController.js");

describe("logMiddleware", () => {
  it("should call logEvent with the right params", () => {
    const req= {};
    const res={};
    const next = jest.fn();
    logMiddleware(req, res, next);

    expect(logEvent).toHaveBeenCalledWith(req, res);
    expect(next).toHaveBeenCalled();
  });
});
