import { Patient, PatientNoSsn } from "../types";
import patientData from "../../data/patients";

const getPatientData = (): Patient[] => {
  return patientData;
};

const getNonSensitivePatientData = (): PatientNoSsn[] => {
  return patientData.map(({ id, name, occupation, gender, dateOfBirth }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
  }));
};

export default { getPatientData, getNonSensitivePatientData };
