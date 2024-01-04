import {v4 as generateUUID} from "uuid";
import Patient from "../models/patient.js";
import {
  createPatient as createPatientRepo,
  listPatients as listPatientsRepo,
  getPatient as getPatientRepo,
} from "../repositories/patientRepository.js";

export const listPatients = async (req, res) => {
  try {
    const response = await listPatientsRepo();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getPatient = async (req, res) => {
  const idPatient = req.params.id_paciente;

  try {
    const response = await getPatientRepo(idPatient);

    if (response.code === 200) {
      if (response.data.Accesible !== true) {
        res.status(403).json();
      } else {
        res.status(200).json(response.data);
      }
    } else if (response.code === 404) {
      res.status(404).json(response.message);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createPatient = async (req, res) => {
  const patient = new Patient(
      req.body.name,
      req.body.fatherLastName,
      req.body.motherLastName,
      req.body.socialSecurityNumber,
      req.body.accessible,
  );
  const patientUUID = generateUUID();

  try {
    const response = await createPatientRepo(
        patient.dbRepresentation(), patientUUID,
    );
    res.status(201).json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
