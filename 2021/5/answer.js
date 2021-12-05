// Read the file
var fs = require('fs');
var path = require('path');
var data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
var lineSegments = data.toString().split("\n").map(l => l.split(" -> ").map(c => c.split(",").map(i => parseInt(i))));

var filledPoints = Array();

// Part 1
console.log("");
console.log("--------- Part 1 ---------");
for (var i = 0; i < lineSegments.length; i++) {
	var line = lineSegments[i];
	if (line[0][0] == line[1][0]) {
		var x = line[0][0];
		var y1 = line[0][1];
		var y2 = line[1][1];
		var minY = Math.min(y1, y2);
		var maxY = Math.max(y1, y2);
		for (var y = minY; y <= maxY; y++) {
			var count = filledPoints[x+","+y] == null ? 0 : filledPoints[x+","+y];
			filledPoints[x+","+y] = count + 1;
		}
	}
	else if (line[0][1] == line[1][1]) {
		var y = line[0][1];
		var x1 = line[0][0];
		var x2 = line[1][0];
		var minX = Math.min(x1, x2);
		var maxX = Math.max(x1, x2);
		for (var x = minX; x <= maxX; x++) {
			var count = filledPoints[x+","+y] == null ? 0 : filledPoints[x+","+y];
			filledPoints[x+","+y] = count + 1;
		}
	}
}
var countOfIntersections = 0;
for (const [key, value] of Object.entries(filledPoints)) {
	if (value > 1) {
		countOfIntersections++;
	}
}
console.log("Answer: " + countOfIntersections);

// Part 2
console.log("");
console.log("--------- Part 2 ---------");
filledPoints = Array();
for (var l = 0; l < lineSegments.length; l++) {
	var line = lineSegments[l];
	var x1 = line[0][0];
	var y1 = line[0][1];
	var x2 = line[1][0];
	var y2 = line[1][1];
	var minX = Math.min(x1, x2);
	var maxX = Math.max(x1, x2);
	var minY = Math.min(y1, y2);
	var maxY = Math.max(y1, y2);
	var loopCount = Math.max(maxX - minX, maxY - minY);
	for (var i = 0; i <= loopCount; i++) {
		var x = x1;
		if (x1 < x2) {
			x = x1 + i;
		} else if (x2 < x1) {
			x = x1 - i;
		}
		var y = y1;
		if (y1 < y2) {
			y = y1 + i;
		} else if (y2 < y1) {
			y = y1 - i;
		}
		var count = filledPoints[x+","+y] == null ? 0 : filledPoints[x+","+y];
		filledPoints[x+","+y] = count + 1;
	}
}
countOfIntersections = 0;
for (const [key, value] of Object.entries(filledPoints)) {
	if (value > 1) {
		countOfIntersections++;
	}
}
console.log("Answer: " + countOfIntersections);
