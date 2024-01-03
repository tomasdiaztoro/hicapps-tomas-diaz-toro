import Patient from "../../src/models/patient.js";
import {
  listPatients,
  getPatient,
  createPatient,
} from "../../src/controllers/patientController.js";
import {
  listPatients as listPatientsRepo,
  getPatient as getPatientRepo,
  createPatient as createPatientRepo,
} from "../../src/repositories/patientRepository.js";
import {TEST_PATIENT_DATA, TEST_UUID} from "../constants.js";

// .mock can't reference out of scope variables, so I duplicated the TEST_UUID
jest.mock("uuid", () => ({
  v4: jest.fn(() => "123e4567-e89b-12d3-a456-426614174000"),
}));
jest.mock("../../src/repositories/patientRepository.js");

describe("patientController", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn(),
  };
  const patient = new Patient(...Object.values(TEST_PATIENT_DATA));
  const patientDBRepresentation = patient.dbRepresentation();

  describe("listPatients", () => {
    it("should call patientRepository with the right params", async () => {
      listPatientsRepo.mockResolvedValue([patientDBRepresentation]);
      await listPatients(null, res);

      expect(listPatientsRepo).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([patientDBRepresentation]);
    });

    it("should handle errors", async () => {
      listPatientsRepo.mockRejectedValue(
          new Error("Error listing patients: Timeout"),
      );
      await listPatients(null, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("Error listing patients: Timeout");
    });
  });

  describe("getPatient", () => {
    const req = {
      params: {
        id_paciente: TEST_UUID,
      },
    };

    it("should call patientRepository with the right params", async () => {
      getPatientRepo.mockResolvedValue(patientDBRepresentation);
      await getPatient(req, res);

      expect(getPatientRepo).toHaveBeenCalledWith(TEST_UUID);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(patientDBRepresentation);
    });

    it("should block access to not accessible patients", async () => {
      const notAccessiblePatient = {...patient, accessible: false};
      getPatientRepo.mockResolvedValue(notAccessiblePatient);
      await getPatient(req, res);

      expect(getPatientRepo).toHaveBeenCalledWith(TEST_UUID);
      expect(res.status).toHaveBeenCalledWith(403);
    });

    it("should handle errors", async () => {
      getPatientRepo.mockRejectedValue(
          new Error("Error getting patient: Timeout"),
      );
      await getPatient(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("Error getting patient: Timeout");
    });
  });

  describe("createPatient", () => {
    const req = {
      body: TEST_PATIENT_DATA,
    };

    it("should call patientRepository with the right params", async () => {
      createPatientRepo.mockResolvedValue(TEST_UUID);
      await createPatient(req, res);

      expect(createPatientRepo).
          toHaveBeenCalledWith(patientDBRepresentation, TEST_UUID);
      expect(res.json).toHaveBeenCalledWith(TEST_UUID);
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("should handle errors", async () => {
      createPatientRepo.mockRejectedValue(
          new Error("Error creating patient: Timeout"),
      );
      await createPatient(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("Error creating patient: Timeout");
    });
  });
});
