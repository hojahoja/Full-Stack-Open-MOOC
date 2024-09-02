import express from "express";
const router = express.Router();
import { Response } from "express";
import { Diagnosis } from "../types";
import diagnosisService from "../services/diagnosisService";

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  res.status(200).send(diagnosisService.getDiagnosisList());
});

export default router;
