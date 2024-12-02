function reportIsSafe(report: number[]): boolean {
  if (report[0] === report[1]) return false;

  const increasing = report[0] < report[1];

  for (let i = 0; i < report.length - 1; i++) {
    if (
      increasing &&
      (report[i + 1] - report[i] < 1 || report[i + 1] - report[i] > 3)
    ) {
      return false;
    } else if (
      !increasing &&
      (report[i] - report[i + 1] < 1 || report[i] - report[i + 1] > 3)
    ) {
      return false;
    }
  }
  console.log(report)
  return true;
}

function reportIsSafeWithDampener(report: number[]): boolean {
  if (report[0] === report[1]) console.log(report[0])
  if (report[0] === report[1])
    return (
      reportIsSafe(report.toSpliced(0, 1)) ||
      reportIsSafe(report.toSpliced(1, 1))
    );

  const increasing = report[0] < report[1];

  for (let i = 0; i < report.length - 1; i++) {
    if (
      (increasing && (report[i + 1] - report[i] < 1 || report[i + 1] - report[i] > 3)) ||
      (!increasing && (report[i] - report[i + 1] < 1 || report[i] - report[i + 1] > 3))
    ) {
      return reportIsSafe(report.toSpliced(i, 1)) || reportIsSafe(report.toSpliced(i + 1, 1));
    }
  }
  console.log(report)
  return true;
}

function main() {
  const fileName = Deno.args[0] || "./input";
  const input = Deno.readTextFileSync(fileName);

  const numSafeReports = input.split("\n").reduce((acc, line) => {
    return acc + (reportIsSafe(line.split(" ").map(Number)) ? 1 : 0);
  }, 0);

  console.log(`Number of safe reports: ${numSafeReports}`);

  const numSafeReportsWithDampener = input.split("\n").reduce((acc, line) => {
    return (
      acc + (reportIsSafeWithDampener(line.split(" ").map(Number)) ? 1 : 0)
    );
  }, 0);

  console.log(
    `Number of safe reports with dampener: ${numSafeReportsWithDampener}`
  );
}

main();
