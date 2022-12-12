// Read the file
var fs = require('fs');
var path = require('path');
var data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
var fish = data.toString().split(",").map(i => parseInt(i));

// Part 1
console.log("");
console.log("--------- Part 1 ---------");
console.log("Answer: " + processFish(fish, 80));

console.log("");
console.log("--------- Part 2 ---------");
console.log("Answer: " + processFish(fish, 256));

function processFish(fish, days) {
	var fishCounts = Array(0,0,0,0,0,0,0,0,0);
	for (var i = 0; i < fish.length; i++) {
		fishCounts[fish[i]]++;
	}

	for (var i = 0; i < days; i++) {
		var poppedFish = fishCounts.shift();
		fishCounts[6] += poppedFish;
		fishCounts.push(poppedFish);
	}

	return fishCounts.reduce((a, b) => a + b);
}