import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const query = req.query;
  const height: number = Number(query.height);
  const weight: number = Number(query.weight);

  if (!isNaN(height + weight)) {
    res.status(200).json({
      weight,
      height,
      bmi: calculateBmi(height, weight),
    });
  } else {
    res.status(400).json({ error: "malformatted parameters" });
  }
});

const PORT = "42069";

app.listen(PORT, () => {
  console.log(`Server is running on a nice port ${PORT}`);
});
