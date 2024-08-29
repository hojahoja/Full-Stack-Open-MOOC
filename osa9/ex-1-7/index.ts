import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);

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

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises }: { target: string; daily_exercises: string[] } = req.body;

  if (!target || !daily_exercises) {
    return res.status(400).json({ error: "parameters missing" });
  }

  const exerciseInput: number[] = [];
  exerciseInput.push(Number(target));
  if (isNaN(exerciseInput[0])) res.status(400).json({ error: "malformatted parameters" });

  for (const exercise of daily_exercises) {
    if (isNaN(Number(exercise))) {
      return res.status(400).json({ error: "malformatted parameters" });
    } else {
      exerciseInput.push(Number(exercise));
    }
  }

  const exerciseData = calculateExercises(exerciseInput);

  return res.status(201).json(exerciseData);
});

const PORT = "42069";

app.listen(PORT, () => {
  console.log(`Server is running on a nice port ${PORT}`);
});
