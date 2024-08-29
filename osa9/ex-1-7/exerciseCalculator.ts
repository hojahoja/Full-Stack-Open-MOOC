import getCliArgs from "./cliArgumentExtractor";

export interface ExerciseData {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (cliArgs: number[]): ExerciseData => {
  const [target, ...hours]: number[] = cliArgs;

  const trainingDays: number = hours.reduce((acc, curr) => (curr !== 0 ? acc + 1 : acc), 0);
  const average: number = hours.reduce((acc, curr) => acc + curr, 0) / hours.length;
  const success: boolean = average > target;
  const rating: number = success ? 3 : target - average > 0.5 ? 1 : 2;
  let ratingDescription: string = "";
  if (rating === 3) {
    ratingDescription = "Target achieved";
  } else if (rating === 2) {
    ratingDescription = "Acceptable performance";
  } else if (rating === 1) {
    ratingDescription = "Deviated too far from target";
  }

  return {
    periodLength: hours.length,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (require.main === module) {
  try {
    const cliArgs: number[] = getCliArgs();
    console.log(calculateExercises(cliArgs));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) errorMessage = `${errorMessage}: ${error.message}`;
    console.log(errorMessage);
  }
}

export { calculateExercises };
