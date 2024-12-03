function main() {
  const fileName = Deno.args[0] || "./input";
  const input = Deno.readTextFileSync(fileName);

  const mulInstructions = [...input.matchAll(/mul\((\d+),(\d+)\)/g)];
  let mulOnlyResult = 0;
  for (const match of mulInstructions) {
    const [_, a, b] = match;
    mulOnlyResult += parseInt(a) * parseInt(b);
  }
  console.log(`Product of mul() only: ${mulOnlyResult}`);

  const allInstructions = [...input.matchAll(/(mul\(\d+,\d+\)|do\(\)|don't\(\))/g)];
  let allResult = 0;
  let mulEnabled = true;
  for (const match of allInstructions) {
    const [instruction] = match;
    if (instruction === "do()") {
      mulEnabled = true;
    } else if (instruction === "don't()") {
      mulEnabled = false;
    } else if (mulEnabled) {
      const match = instruction.match(/mul\((\d+),(\d+)\)/);
      if (match) {
        const [_, a, b] = match;
        allResult += parseInt(a) * parseInt(b);
      }
    }
  }

  console.log(`Product of all instructions: ${allResult}`);
}

main();
