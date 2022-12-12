// Read the file
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
const lines = data.toString().split("\n");

// Part 1
var currentPath = ["/"];

// We'll just store the size of all directory paths from / to the deepest dir
// because that works for this puzzle!
var dirSizes = {"/": 0};

for (const line of lines) {
	const parts = line.split(" ");
	if (line.substring(0,1) == "$") {
		if (parts[1] == "cd") {
			if (parts[2] == "/") {
				currentPath = ["/"];
			}
			else if (parts[2] == "..") {
				currentPath.pop();
			}
			else {
				currentPath.push(parts[2]);
			}
		}
	}
	else if (line.substring(0,3) != "dir") {
		const size = parseInt(parts[0]);
		var appendPath = "";
		for (const pathPart of currentPath) {
			appendPath+= pathPart;
			if (pathPart != "/") { appendPath += "/"; }
			if (dirSizes[appendPath] == undefined) { dirSizes[appendPath] = 0; }
			dirSizes[appendPath] += size;
		}
	}
}
var total = 0;
for (const [key, value] of Object.entries(dirSizes)) {
	if (value <= 100000) {
		total += value;
	}
}
console.log("Part 1: " + total);

// Part 2
var totalUsed = dirSizes["/"];
var diskSize = 70000000;
var totalSpace = 70000000 - totalUsed;
var requiredSpaceForUpdate = 30000000;
var requiredSpaceToClear = requiredSpaceForUpdate - totalSpace;
var smallestFound = Number.MAX_SAFE_INTEGER;
var smallestFoundDir = "";
for (const [key, value] of Object.entries(dirSizes)) {
	if (value >= requiredSpaceToClear && value < smallestFound) {
		smallestFound = value;
		smallestFoundDir = key;
	}
}
console.log("Part 2: Deleting " + smallestFoundDir + " will clear " + smallestFound);
