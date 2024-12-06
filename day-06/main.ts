function getInitialPos(map: string[][]): { x: number; y: number } {
  for (let y = 0; y < map.length; y++) {
    const x = map[y].indexOf("^");
    if (x !== -1) {
      return { x, y };
    }
  }
  throw new Error("Starting position not found");
}

function getUnobstructedRoute(initialMap: string[][], initialPos: { x: number; y: number }) {
  const map = initialMap.map((line) => [...line]);
  let pos = { x: initialPos.x, y: initialPos.y };
  let direction = { x: 0, y: -1 };
  let numVisitedPositions = 1;

  while (true) {
    const nextPos = { x: pos.x + direction.x, y: pos.y + direction.y };

    if (
      nextPos.y < 0 ||
      nextPos.y >= map.length ||
      nextPos.x < 0 ||
      nextPos.x >= map[nextPos.y].length
    ) break;

    const nextChar = map[nextPos.y][nextPos.x];
    if (nextChar === "#") {
      direction = { x: -direction.y, y: direction.x };
    } else {
      if (nextChar === ".") {
        numVisitedPositions++;
        map[nextPos.y][nextPos.x] = "X";
      }
      pos = nextPos;
    }
  }

  return { unobstructedRouteMap: map, numVisitedPositions };
}

function canLeave(map: string[][], initialPos: { x: number; y: number }): boolean {
  let pos = { x: initialPos.x, y: initialPos.y };
  let direction = { x: 0, y: -1 };

  for (let steps = 0; steps < 10000; steps++) {
    const nextPos = { x: pos.x + direction.x, y: pos.y + direction.y };

    if (
      nextPos.y < 0 ||
      nextPos.y >= map.length ||
      nextPos.x < 0 ||
      nextPos.x >= map[nextPos.y].length
    ) return true;

    const nextChar = map[nextPos.y][nextPos.x];
    if (nextChar === "#" || nextChar === "O") {
      direction = { x: -direction.y, y: direction.x };
    } else {
      pos = nextPos;
    }
  }

  return false;
}

function main() {
  const fileName = Deno.args[0] || "./input";
  const input = Deno.readTextFileSync(fileName);
  const initialMap = input.split(/\r?\n/).map((line) => line.split(""));
  const initialPos = getInitialPos(initialMap);

  const { unobstructedRouteMap, numVisitedPositions } = getUnobstructedRoute(initialMap, initialPos);

  let numObstructedPositions = 0;

  for (let y = 0; y < unobstructedRouteMap.length; y++) {
    for (let x = 0; x < unobstructedRouteMap[y].length; x++) {
      if (unobstructedRouteMap[y][x] === "X") {
        const obstructedMap = initialMap.map((line) => [...line]);
        obstructedMap[y][x] = "O";
        numObstructedPositions += canLeave(obstructedMap, initialPos) ? 0 : 1;
      }
    }
  }

  console.log(`Number of visited positions: ${numVisitedPositions}`);
  console.log(`Number of obstructed positions: ${numObstructedPositions}`);
}

main();
