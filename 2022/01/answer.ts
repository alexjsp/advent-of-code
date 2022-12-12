// Read the file
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
const inventoryStrings: string[] = data.toString().split("\n\n");
const inventories = inventoryStrings.map(x => x.split("\n").map(s => parseInt(s)));

// Part 1
var totalCounts = inventories.map(i => i.reduce((a, b) => a + b, 0));
totalCounts.sort((a, b) => b-a);
console.log("Part 1: " + totalCounts[0]);

// Part 2
const topThree = totalCounts[0] + totalCounts[1] + totalCounts[2];
console.log("Part 2: " + topThree);
