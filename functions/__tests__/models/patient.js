import Patient from "../../src/models/patient.js";
import {TEST_PATIENT_DATA} from "../constants.js";

describe("Patient", () => {
  it("should create a new Patient instance", () => {
    const patient = new Patient(...Object.values(TEST_PATIENT_DATA));

    expect(patient.name).toBe(TEST_PATIENT_DATA.name);
    expect(patient.fatherLastName).toBe(TEST_PATIENT_DATA.fatherLastName);
    expect(patient.motherLastName).toBe(TEST_PATIENT_DATA.motherLastName);
    expect(patient.socialSecurityNumber)
        .toBe(TEST_PATIENT_DATA.socialSecurityNumber);
    expect(patient.accessible).toBe(TEST_PATIENT_DATA.accessible);
  });

  it("should return the database representation of the Patient object", () => {
    const patient = new Patient(...Object.values(TEST_PATIENT_DATA));

    const expectedDbRepresentation = {
      "Nombre": TEST_PATIENT_DATA.name,
      "Apellido Paterno": TEST_PATIENT_DATA.fatherLastName,
      "Apellido Materno": TEST_PATIENT_DATA.motherLastName,
      "Número de seguridad social": TEST_PATIENT_DATA.socialSecurityNumber,
      "Accesible": TEST_PATIENT_DATA.accessible,
    };

    expect(patient.dbRepresentation()).toEqual(expectedDbRepresentation);
  });

  describe("Error cases", () => {
    const fields = [
      {
        name: "name",
        values: [false, undefined],
        type: "string",
      },
      {
        name: "fatherLastName",
        values: [false, undefined],
        type: "string",
      },
      {
        name: "motherLastName",
        values: [false, undefined],
        type: "string",
      },
      {
        name: "socialSecurityNumber",
        values: [false, undefined],
        type: "string",
      },
      {
        name: "accessible",
        values: ["not a boolean", undefined],
        type: "boolean",
      },
    ];

    fields.forEach((field) => {
      it(`should throw an error if ${field.name} isn't valid`, () => {
        field.values.forEach((value) => {
          const testData = {...TEST_PATIENT_DATA};
          testData[field.name] = value;
          expect(() => new Patient(...Object.values(testData))).toThrow(
              `${field.name} must be ${field.type}`,
          );
        });
      });
    });
  });
});
