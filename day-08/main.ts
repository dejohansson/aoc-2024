function getAntennas(map: string[][]): Map<string, { x: number; y: number }[]> {
  const antennas = new Map<string, { x: number; y: number }[]>();
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const char = map[y][x];
      if (char !== ".") {
        if (!antennas.has(char)) antennas.set(char, [{ x, y }]);
        else antennas.get(char)!.push({ x, y });
      }
    }
  }
  return antennas;
}

function getAntinodes(
  antennas: Map<string, { x: number; y: number }[]>,
  maxX: number,
  maxY: number
): Set<string> {
  const antinodes = new Set<string>();
  for (const positions of antennas.values()) {
    for (let pi = 0; pi < positions.length; pi++) {
      for (let pj = pi + 1; pj < positions.length; pj++) {
        const a1 = positions[pi];
        const a2 = positions[pj];

        const dx = a2.x - a1.x;
        const dy = a2.y - a1.y;

        const antiNode1 = { x: a1.x - dx, y: a1.y - dy };
        const antiNode2 = { x: a2.x + dx, y: a2.y + dy };
        if (antiNode1.x >= 0 && antiNode1.x < maxX && antiNode1.y >= 0 && antiNode1.y < maxY)
          antinodes.add(`${antiNode1.x},${antiNode1.y}`);
        if (antiNode2.x >= 0 && antiNode2.x < maxX && antiNode2.y >= 0 && antiNode2.y < maxY)
          antinodes.add(`${antiNode2.x},${antiNode2.y}`);
      }
    }
  }
  return antinodes;
}

function getResonantHarmonicAntinodes(
  antennas: Map<string, { x: number; y: number }[]>,
  maxX: number,
  maxY: number
): Set<string> {
  const resonantHarmonicAntinodes = new Set<string>();
  for (const positions of antennas.values()) {
    for (let pi = 0; pi < positions.length; pi++) {
      for (let pj = pi + 1; pj < positions.length; pj++) {
        const a1 = positions[pi];
        const a2 = positions[pj];

        const dx = a2.x - a1.x;
        const dy = a2.y - a1.y;

        let x = a1.x;
        let y = a1.y;
        while (x >= 0 && x < maxX && y >= 0 && y < maxY) {
          resonantHarmonicAntinodes.add(`${x},${y}`);
          x -= dx;
          y -= dy;
        }

        x = a2.x;
        y = a2.y;
        while (x >= 0 && x < maxX && y >= 0 && y < maxY) {
          resonantHarmonicAntinodes.add(`${x},${y}`);
          x += dx;
          y += dy;
        }
      }
    }
  }
  return resonantHarmonicAntinodes;
}

function main() {
  const fileName = Deno.args[0] || "./input";
  const input = Deno.readTextFileSync(fileName);

  const map = input.split(/\r?\n/).map((line) => line.split(""));
  const maxY = map.length;
  const maxX = map[0].length;
  const antennas = getAntennas(map);

  const antinodes = getAntinodes(antennas, maxX, maxY);
  const resonantHarmonicAntinodes = getResonantHarmonicAntinodes(antennas, maxX, maxY);

  console.log(`Number of antinodes: ${antinodes.size}`);
  console.log(`Number of resonant harmonic antinodes: ${resonantHarmonicAntinodes.size}`);
}

main();
