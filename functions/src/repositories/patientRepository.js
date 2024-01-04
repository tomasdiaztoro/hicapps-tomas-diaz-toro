import db from "../configs/db.js";

export const listPatients = async () => {
  try {
    const snapshot = await db.ref("pacientes").once("value");
    const patients = [];
    snapshot.forEach((childSnapshot) => {
      const patient = childSnapshot.val();
      patients.push(patient);
    });
    return patients;
  } catch (error) {
    throw new Error(`Error listing patients: ${error.message}`);
  }
};

export const getPatient = async (patientId) => {
  try {
    const snapshot = await db.ref(`pacientes/${patientId}`).once("value");
    if (snapshot.exists()) {
      return {code: 200, data: snapshot.val(), message: null};
    } else {
      return {code: 404, data: null, message: "Patient not found"};
    }
  } catch (error) {
    throw new Error(`Error getting patient: ${error.message}`);
  }
};

export const createPatient = async (patient, patientUUID) => {
  try {
    await db.ref(`pacientes/${patientUUID}`).set(patient);
    return patientUUID;
  } catch (error) {
    throw new Error(`Error creating patient: ${error.message}`);
  }
};
