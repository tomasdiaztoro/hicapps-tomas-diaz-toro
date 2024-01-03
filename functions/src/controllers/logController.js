import Log from "../models/log.js";
import {createLog} from "../repositories/logRepository.js";

export const logEvent = async (req, res) => {
  const log = new Log(`Acceso a endpoint ${req.method} ${req.path}`);
  try {
    await createLog(log);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
