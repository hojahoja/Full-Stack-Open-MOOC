import getCliArgs from "./cliArgumentExtractor";

const calculateBmi = (cm: number, kg: number): string => {
  const bmi: number = kg / (cm / 100) ** 2;

  if (bmi < 16) {
    return "Underweight (Severe thinness)";
  } else if (bmi < 17) {
    return "Underweight (Moderate thinness)";
  } else if (bmi < 18.5) {
    return "Underweight (Mild thinness)";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight (Pre-obese)";
  } else if (bmi < 35) {
    return "Obese (Class I)";
  } else if (bmi < 40) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};

if (require.main === module) {
  try {
    const cliArgs: number[] = getCliArgs();
    if (cliArgs.length !== 2) throw new Error(`Expected 2 arguments got ${cliArgs.length}`);
    console.log(calculateBmi(cliArgs[0], cliArgs[1]));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) errorMessage = `${errorMessage}: ${error.message}`;
    console.log(errorMessage);
  }
}

export { calculateBmi };
