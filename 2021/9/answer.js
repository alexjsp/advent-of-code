// Read the file
var fs = require('fs');
var path = require('path');
var data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
var map = data.toString().split("\n").map(l => l.split("").map(i => parseInt(i)));

// Part 1
console.log("");
console.log("--------- Part 1 ---------");
var riskSum = 0;
for (var y = 0; y < map.length; y++) {
	for (var x = 0; x < map[y].length; x++) {
		var value = map[y][x];
		var previousRow = map[y-1];
		var nextRow = map[y+1];
		var prevCol = map[y][x - 1];
		if (prevCol == null) { prevCol = 10; }
		var nextCol = map[y][x + 1];
		if (nextCol == null) { nextCol = 10; }
		if ((previousRow == null || value < previousRow[x])
			&& (nextRow == null || value < nextRow[x])
			&& value < prevCol
			&& value < nextCol) {
				riskSum += value + 1;
			}
	}
}
console.log("Answer: " + riskSum);

console.log("");
console.log("--------- Part 2 ---------");
