function part1() {
  const fileName = Deno.args[0] || "./input";
  const input = Deno.readTextFileSync(fileName);

  const fileSystem: string[] = [];

  for (let i = 0; i < input.length; i++) {
    const char = i % 2 === 0 ? (i / 2).toString() : ".";
    for (let j = 0; j < parseInt(input[i]); j++) {
      fileSystem.push(char);
    }
  }

  let frontPointer = 0;
  let backPointer = fileSystem.length - 1;
  let checksum = 0;

  while (backPointer >= frontPointer) {
    if (fileSystem[frontPointer] === "." && fileSystem[backPointer] === ".") {
      backPointer--;
    } else if (fileSystem[frontPointer] !== ".") {
      checksum += parseInt(fileSystem[frontPointer]) * frontPointer;
      // console.log(`${parseInt(fileSystem[frontPointer])} ${frontPointer}`);
      frontPointer++;
    } else if (
      fileSystem[frontPointer] === "." &&
      fileSystem[backPointer] !== "."
    ) {
      fileSystem[frontPointer] = fileSystem[backPointer];
      fileSystem[backPointer] = ".";
      // console.log(fileSystem.join(""));
      checksum += parseInt(fileSystem[frontPointer]) * frontPointer;
      // console.log(`${parseInt(fileSystem[frontPointer])} ${frontPointer}`);

      frontPointer++;
      backPointer--;
    }
  }

  console.log(`Checksum: ${checksum}`);
}

function part2() {
  const fileName = Deno.args[0] || "./input";
  const input = Deno.readTextFileSync(fileName);

  const fileSystem: string[] = [];
}

part1();

part2();
