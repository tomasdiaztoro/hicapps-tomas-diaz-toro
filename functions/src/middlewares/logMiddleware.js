import {logEvent} from "../controllers/logController.js";

const logMiddleware = (req, res, next) => {
  logEvent(req, res);
  next();
};

export default logMiddleware;
