const getCliArgs = (): number[] => {
  const values: number[] = [];

  for (let i = 2; i < process.argv.length; i++) {
    const numberArg: number = Number(process.argv[i]);

    if (!isNaN(numberArg)) {
      values.push(numberArg);
    } else {
      throw new Error("Some of the provided values were not numbers");
    }
  }
  return values;
};

export default getCliArgs;
