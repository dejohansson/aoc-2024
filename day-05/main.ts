function isValidUpdate(pages: string[], rules: { [key: string]: Set<string> }): boolean {
  const previousPages = new Set<string>();

  for (const page of pages) {
    if (rules[page] && !previousPages.isDisjointFrom(rules[page])) return false;
    previousPages.add(page);
  }
  return true;
}

function reorderPages(pages: string[], rules: { [key: string]: Set<string> }): string[] {
  while (true) {
    const previousPages = new Set<string>();

    for (let i = 0; i < pages.length; i++) {
      if (rules[pages[i]] && !previousPages.isDisjointFrom(rules[pages[i]])) {
        const page = pages.splice(i, 1)[0];
        pages.unshift(page);
        break;
      }
      if (i === pages.length - 1) return pages;
      previousPages.add(pages[i]);
    }
  }
}

function main() {
  const fileName = Deno.args[0] || "./input";
  const input = Deno.readTextFileSync(fileName);

  const [orderingRulesString, updatesString] = input.split(/\r?\n\r?\n/);

  const orderingRules: { [key: string]: Set<string> } = {};
  for (const line of orderingRulesString.split(/\r?\n/)) {
    const [key, value] = line.split("|");
    if (!orderingRules[key]) orderingRules[key] = new Set([value]);
    else orderingRules[key].add(value);
  }

  let middlePageSum = 0;
  let reorderedMiddlePageSum = 0;
  for (const line of updatesString.split(/\r?\n/)) {
    const pages = line.split(",");
    if (!isValidUpdate(pages, orderingRules)) {
      reorderPages(pages, orderingRules);
      reorderedMiddlePageSum += Number(pages[Math.floor(pages.length / 2)]);
      continue;
    }
    middlePageSum += Number(pages[Math.floor(pages.length / 2)]);
  }

  console.log(`The sum of the middle pages from the correct updates is ${middlePageSum}.`);
  console.log(
    `The sum of the middle pages from the reordered updates is ${reorderedMiddlePageSum}.`
  );
}

main();
