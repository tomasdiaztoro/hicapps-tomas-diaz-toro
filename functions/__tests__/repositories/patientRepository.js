import {
  listPatients,
  getPatient,
  createPatient,
} from "../../src/repositories/patientRepository.js";
import Patient from "../../src/models/patient.js";
import db from "../../src/configs/db.js";
import {TEST_PATIENT_DATA, TEST_UUID} from "../constants.js";

jest.mock("../../src/configs/db.js");

describe("patientRepository", () => {
  const patientsList = [new Patient(...Object.values(TEST_PATIENT_DATA))];

  describe("listPatients", () => {
    it("should hit db with the right data and return patients", async () => {
      const snapshot = {
        forEach: jest.fn((callback) => {
          patientsList.forEach(
              (patient) => callback({val: jest.fn(() => patient)}),
          );
        }),
      };
      db.ref.mockReturnValue({
        once: jest.fn().mockResolvedValue(snapshot),
      });
      const patients = await listPatients();

      expect(db.ref).toHaveBeenCalledWith("pacientes");
      expect(patients).toEqual(patientsList);
    });

    it("should handle errors", async () => {
      db.ref.mockReturnValue({
        once: jest.fn().mockRejectedValue(new Error("Timeout")),
      });

      await expect(listPatients()).rejects.toThrow(
          "Error listing patients: Timeout",
      );
    });
  });

  describe("getPatient", () => {
    it("should hit db with the right data and return a patient", async () => {
      const patient = patientsList[0];
      db.ref.mockReturnValue({
        once: jest.fn().mockResolvedValue({
          exists: () => true,
          val: () => patient,
        }),
      });
      const response = await getPatient(0);

      expect(db.ref).toHaveBeenCalledWith("pacientes");
      expect(response).toEqual(patient);
    });

    it("should handle errors", async () => {
      db.ref.mockReturnValue({
        once: jest.fn().mockRejectedValue(new Error("Timeout")),
      });

      await expect(getPatient(0)).rejects.toThrow(
          "Error getting patient: Timeout",
      );
    });
  });

  describe("createPatient", () => {
    it("should hit db with the right data and create a patient", async () => {
      const newPatient = patientsList[0];
      db.ref.mockReturnValue({
        set: jest.fn().mockResolvedValue(newPatient),
      });
      const response = await createPatient(newPatient, TEST_UUID);

      expect(db.ref).toHaveBeenCalledWith("pacientes");
      expect(response).toEqual(TEST_UUID);
    });

    it("should handle errors", async () => {
      db.ref.mockReturnValue({
        set: jest.fn().mockRejectedValue(new Error("Timeout")),
      });

      await expect(createPatient({})).rejects.toThrow(
          "Error creating patient: Timeout",
      );
    });
  });
});
