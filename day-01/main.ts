function main() {
  const fileName = Deno.args[0] || "./input";
  const input = Deno.readTextFileSync(fileName);

  const list1: number[] = [];
  const list2: number[] = [];

  input.split("\n").forEach((line) => {
    const locations = line.split("   ");

    list1.push(parseInt(locations[0]));
    list2.push(parseInt(locations[1]));
  });

  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  const totalDistance = list1.reduce((sum, current, i) => {
    return sum + Math.abs(current - list2[i]);
  }, 0);

  console.log(`Total distance: ${totalDistance}`);

  const list2Occurences = list2.reduce((occurences: { [key: number]: number }, current) => {
    occurences[current] = (occurences[current] || 0) + current;
    return occurences;
  }, {});

  const totalSimilarityScore = list1.reduce((sum, current) => {
    return sum + (list2Occurences[current] || 0);
  }, 0);

  console.log(`Total similarity score: ${totalSimilarityScore}`);
}

main();
