import {v4 as uuidv4} from "uuid";
import Patient from "./src/models/patient.js";
import {createPatient} from "./src/repositories/patientRepository.js";


const patients = [
  new Patient("Tomás", "Díaz", "Toro", "012340", true),
  new Patient("Rocío", "Sanhueza", "Pérez", "023401", true),
  new Patient("Joseph", "Díaz", "Toro", "052340", false),
];

Promise.all(patients.map((patient) => {
  const patientUUID = uuidv4();

  return createPatient(patient.dbRepresentation(), patientUUID)
      .then((result) => {
        console.log(`Patient created | UUID: ${result}`);
      });
})).then(() => {
  process.exit(0);
}).catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
