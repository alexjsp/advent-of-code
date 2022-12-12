// Read the file
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
const string = data.toString();

function findUniqueSection(string: string, desiredLength: number) {
	for (var i = desiredLength; i < string.length; i++) {
		const set = new Set(string.substr(i-desiredLength, desiredLength).split(""));
		if (set.size == desiredLength) {
			return i;
		}
	}
}

// Part 1
console.log("Part 1: " + findUniqueSection(string, 4));

// Part 2
console.log("Part 2: " + findUniqueSection(string, 14));
