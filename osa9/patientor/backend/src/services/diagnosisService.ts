import { Diagnosis } from "../types";
import diagnosesData from "../../data/diagnoses";

const getDiagnosisList = (): Diagnosis[] => {
  return diagnosesData;
};

export default { getDiagnosisList };
