// Read the file
var fs = require('fs');
var path = require('path');
var data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
var crabs = data.toString().split(",").map(i => parseInt(i));

// Part 1
console.log("");
console.log("--------- Part 1 ---------");
console.log("Answer: " + findSmallestFuelMove(crabs, false));

console.log("");
console.log("--------- Part 2 ---------");
console.log("Answer: " + findSmallestFuelMove(crabs, true));

function findSmallestFuelMove(crabs, part2) {
	var lowestPos = Math.min(...crabs);
	var highestPos = Math.max(...crabs);
	var lowestUsedFuel = 0;
	for (var i = lowestPos; i <= highestPos; i++) {
		var usedFuel = 0;
		for (var c = 0; c < crabs.length; c++) {
			var difference = Math.abs(crabs[c] - i);
			if (!part2) { usedFuel += difference; }
			else {
				for (var j = 1; j <= difference; j++) {
					usedFuel += j;
				}
			}
		}
		if (i == lowestPos || usedFuel < lowestUsedFuel) {
			lowestUsedFuel = usedFuel;
		}
	}
	return lowestUsedFuel;
}