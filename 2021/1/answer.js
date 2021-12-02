// Read the file
var fs = require('fs');
var path = require('path');
var data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
var lines = data.toString().split("\n").filter(x => x.length > 0).map(x => parseInt(x));

// Part 1
var increases = 0;
for (var i = 1; i < lines.length; i++)
{
	if (lines[i] > lines[i-1]){
		increases++;
	}
}
console.log("Part 1: " + increases);

// Part 2
var windowIncreases = 0;
for (var i = 3; i < lines.length; i++)
{
	if (lines[i]+lines[i-1]+lines[i-2] > lines[i-1]+lines[i-2]+lines[i-3]){
		windowIncreases++;
	}
}
console.log("Part 2: " + windowIncreases);