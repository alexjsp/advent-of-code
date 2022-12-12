// Read the file
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');

function charToItemNumber(c: string) : number {
    var item = c.charCodeAt(0);
    if (item > 96) { item -= 96; }
    else { item -= 38; }
    return item;
}

const rucksackStrings: string[] = data.toString().split("\n");

const rucksackPairs = rucksackStrings.map(x => {
    const half = x.length / 2;
    const leftString = x.substr(0, half);
    const rightString = x.substr(half, half);
    const left = leftString.split("").map(y => charToItemNumber(y));
    const right = rightString.split("").map(y => charToItemNumber(y));
    return [left, right];
});

// Part 1
var prioritySum = 0;
for (const rucksackPair of rucksackPairs) {
    const commonItem = rucksackPair[0].find(element => {
      return rucksackPair[1].includes(element);
    });
    prioritySum += commonItem!;
}
console.log("Part 1: " + prioritySum);

// Part 2
var prioritySum2 = 0;
for (var i = 0; i < rucksackPairs.length; i+=3) {
    // Merge the sides again 🙃
    const sack1 = rucksackPairs[i].flat();
    const sack2 = rucksackPairs[i+1].flat();
    const sack3 = rucksackPairs[i+2].flat();
    const commonItem = sack1.find(element => {
       return sack2.includes(element) && sack3.includes(element);
    });
    prioritySum2 += commonItem!;
}
console.log("Part 2: " + prioritySum2);
