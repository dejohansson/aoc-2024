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
      frontPointer++;
    } else if (fileSystem[frontPointer] === "." && fileSystem[backPointer] !== ".") {
      fileSystem[frontPointer] = fileSystem[backPointer];
      fileSystem[backPointer] = ".";
      checksum += parseInt(fileSystem[frontPointer]) * frontPointer;
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

  for (let i = 0; i < input.length; i++) {
    const char = i % 2 === 0 ? (i / 2).toString() : ".";
    for (let j = 0; j < parseInt(input[i]); j++) {
      fileSystem.push(char);
    }
  }

  let pointer = fileSystem.length - 1;

  while (pointer > 0) {
    if (fileSystem[pointer] === ".") {
      pointer--;
    } else {
      const char = fileSystem[pointer];
      let fileSize = 1;
      while (pointer - fileSize > 0 && fileSystem[pointer - fileSize] === char) {
        fileSize++;
      }

      if (pointer - fileSize === 0) {
        break;
      }

      const freeSpace = Array(fileSize).fill(".");
      const searchSpace = fileSystem.slice(0, pointer - fileSize + 1);

      for (let i = 0; i < searchSpace.length; i++) {
        const chunk = searchSpace.slice(i, i + fileSize);
        if (chunk.join("") === freeSpace.join("")) {
          fileSystem.splice(i, fileSize, ...fileSystem.slice(pointer - fileSize + 1, pointer + 1));
          fileSystem.splice(pointer - fileSize + 1, fileSize, ...freeSpace);
          break;
        }
      }

      pointer -= fileSize;
    }
  }

  const checksumWithoutFragmentation = fileSystem.reduce((sum, val, i) => {
    return sum + (val === "." ? 0 : parseInt(val) * i);
  }, 0);

  console.log(`Checksum without fragmentation: ${checksumWithoutFragmentation}`);
}

part1();
part2();
