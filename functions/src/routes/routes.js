
import logMiddleware from "../middlewares/logMiddleware.js";
import {
  getPatient,
  listPatients,
  createPatient,
} from "../controllers/patientController.js";
import {Router as expressRouter} from "express";

const router = expressRouter();

router.use(logMiddleware);
router.get("/pacientes", listPatients);
router.get("/pacientes/:id_paciente", getPatient);
router.post("/pacientes", createPatient);

export default router;
