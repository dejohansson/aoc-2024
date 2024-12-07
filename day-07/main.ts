function* generatePermutations(
  operators: ((a: number, b: number) => number)[],
  length: number
): Generator<((a: number, b: number) => number)[]> {
  if (length === 1) {
    for (const operator of operators) {
      yield [operator];
    }
  } else {
    for (const operator of operators) {
      for (const permutation of generatePermutations(operators, length - 1)) {
        yield [operator, ...permutation];
      }
    }
  }
}

function getCalibrationResult(
  expected: number,
  operators: ((a: number, b: number) => number)[],
  operands: number[]
): number {
  let result = operands[0];
  for (let i = 0; i < operators.length; i++) {
    if (result > expected) return 0;
    result = operators[i](result, operands[i + 1]);
  }

  if (result === expected) return expected;
  else return 0;
}

function main() {
  const fileName = Deno.args[0] || "./input";
  const input = Deno.readTextFileSync(fileName);

  const equations: { expected: number; operands: number[] }[] = [];
  input.split(/\r?\n/).forEach((line) => {
    const [stringExpectedValue, stringOperands] = line.split(": ");
    equations.push({
      expected: parseInt(stringExpectedValue),
      operands: stringOperands.split(" ").map((operand) => parseInt(operand)),
    });
  });

  const operators = [(a: number, b: number) => a + b, (a: number, b: number) => a * b];
  const operatorsWithConcatenation = [
    (a: number, b: number) => a + b,
    (a: number, b: number) => a * b,
    (a: number, b: number) => parseInt(`${a}${b}`),
  ];

  let totalCalibrationResult = 0;
  let totalCalibrationResultWithConcatenation = 0;

  for (const { expected, operands } of equations) {
    for (const operatorPermutation of generatePermutations(operators, operands.length - 1)) {
      const result = getCalibrationResult(expected, operatorPermutation, operands);
      if (result > 0) {
        totalCalibrationResult += result;
        break;
      }
    }

    for (const operatorPermutation of generatePermutations(
      operatorsWithConcatenation,
      operands.length - 1
    )) {
      const result = getCalibrationResult(expected, operatorPermutation, operands);
      if (result > 0) {
        totalCalibrationResultWithConcatenation += result;
        break;
      }
    }
  }

  console.log(`Total calibration result: ${totalCalibrationResult}`);
  console.log(
    `Total calibration result with concatenation: ${totalCalibrationResultWithConcatenation}`
  );
}

main();
