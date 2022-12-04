// Read the file
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
const pairStrings: string[] = data.toString().split("\n");
const pairs = pairStrings.map(x => x.split(",").map(y => y.split("-").map(s => parseInt(s))));

// Part 1
const fullyContainedPairs = pairs.filter(pair => {
	const min1 = pair[0][0];
	const max1 = pair[0][1];
	const min2 = pair[1][0];
	const max2 = pair[1][1];
	return (min1 <= min2 && max1 >= max2) || (min2 <= min1 && max2 >= max1);
});
console.log("Part 1: " + fullyContainedPairs.length);

// Part 2
const overlappingPairs = pairs.filter(pair => {
	const min1 = pair[0][0];
	const max1 = pair[0][1];
	const min2 = pair[1][0];
	const max2 = pair[1][1];
	return min1 <= max2 && min2 <= max1;
});
console.log("Part 2: " + overlappingPairs.length);
