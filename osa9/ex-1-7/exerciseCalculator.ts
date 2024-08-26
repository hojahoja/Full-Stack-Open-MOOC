interface ExerciseData {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: number[], target: number): ExerciseData => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
