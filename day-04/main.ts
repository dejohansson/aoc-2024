const DIRECTIONS = [
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function countXmas(chars: string[][], x: number, y: number): number {
  if (chars[y][x] !== "X") return 0;

  let count = 0;
  for (const [dx, dy] of DIRECTIONS) {
    if (
      y + 3 * dy < chars.length &&
      y + 3 * dy >= 0 &&
      x + 3 * dx < chars[y].length &&
      x + 3 * dx >= 0 &&
      chars[y + 1 * dy][x + 1 * dx] === "M" &&
      chars[y + 2 * dy][x + 2 * dx] === "A" &&
      chars[y + 3 * dy][x + 3 * dx] === "S"
    )
      count += 1;
  }

  return count;
}

function isXShapedMas(chars: string[][], x: number, y: number): boolean {
  if (y - 1 < 0 || y + 1 >= chars.length || x - 1 < 0 || x + 1 >= chars[y].length) return false;

  const mssm = ["MS", "SM"];
  const backSlash = chars[y - 1][x - 1] + chars[y + 1][x + 1];
  const forwardSlash = chars[y + 1][x - 1] + chars[y - 1][x + 1];

  if (chars[y][x] === "A" && mssm.includes(backSlash) && mssm.includes(forwardSlash)) return true;
  else return false;
}

function main() {
  const fileName = Deno.args[0] || "./input";
  const input = Deno.readTextFileSync(fileName);

  const charMatrix = input.split(/\r?\n/).map((line) => line.split(""));

  let xmasCount = 0;
  let xShapedMasCount = 0;
  for (let i = 0; i < charMatrix.length; i++) {
    for (let j = 0; j < charMatrix[i].length; j++) {
      xmasCount += countXmas(charMatrix, j, i);
      xShapedMasCount += isXShapedMas(charMatrix, j, i) ? 1 : 0;
    }
  }

  console.log`The word "XMAS" appears ${xmasCount} times.`;
  console.log`The number of X-shaped "MAS" is ${xShapedMasCount}.`;
}

main();
