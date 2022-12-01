// Read the file
var fs = require('fs');
var path = require('path');
var data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
var inventories = data.toString().split("\n\n").map(x => x.split("\n").map(s => parseInt(s)));

// Part 1
var totalCounts = inventories.map(i => i.reduce((a, b) => a + b, 0));
totalCounts.sort(function(a, b){return b - a});
console.log("Part 1: " + totalCounts[0]);

// Part 2
var topThree = totalCounts[0] + totalCounts[1] + totalCounts[2];
console.log("Part 2: " + topThree);