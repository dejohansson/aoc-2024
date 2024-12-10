const directions = [
  [0, -1], // up
  [0, 1], // down
  [-1, 0], // left
  [1, 0], // right
];

function getTrailTops(map: number[][], x: number, y: number): Set<string> {
  if (map[y][x] === 9) return new Set<string>([`${x},${y}`]);

  const current = map[y][x];
  const trailTops = new Set<string>();

  for (const [dx, dy] of directions) {
    const newX = x + dx;
    const newY = y + dy;
    if (map[newY]?.[newX] === current + 1) {
      const tops = getTrailTops(map, newX, newY);
      for (const top of tops) {
        trailTops.add(top);
      }
    }
  }

  return trailTops;
}

const trailPathRatings = new Map<string, number>();

function getTrailHeadRating(map: number[][], x: number, y: number): number {
  if (trailPathRatings.has(`${x},${y}`)) return trailPathRatings.get(`${x},${y}`)!;

  if (map[y][x] === 9) {
    trailPathRatings.set(`${x},${y}`, 1);
    return 1;
  }

  const current = map[y][x];
  let rating = 0;

  for (const [dx, dy] of directions) {
    const newX = x + dx;
    const newY = y + dy;
    if (map[newY]?.[newX] === current + 1) {
      rating += getTrailHeadRating(map, newX, newY);
    }
  }

  trailPathRatings.set(`${x},${y}`, rating);
  return rating;
}

function main() {
  const fileName = Deno.args[0] || "./input";
  const input = Deno.readTextFileSync(fileName);

  const map = input.split(/\r?\n/).map((line) => line.split("").map((x) => parseInt(x)));

  let totalTrailHeadScore = 0;
  let totalTrailHeadRating = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 0) {
        totalTrailHeadScore += getTrailTops(map, x, y).size;
        totalTrailHeadRating += getTrailHeadRating(map, x, y);
      }
    }
  }

  console.log(`Total trail head score: ${totalTrailHeadScore}`);
  console.log(`Total trail head rating: ${totalTrailHeadRating}`);
}

main();
