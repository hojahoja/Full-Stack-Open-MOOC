import express from "express";
const router = express.Router();
import { Response } from "express";
import { PatientNoSsn } from "../types";
import patientsService from "../services/patientsService";

router.get("/", (_req, res: Response<PatientNoSsn[]>) => {
  res.status(200).send(patientsService.getNonSensitivePatientData());
});

export default router;
