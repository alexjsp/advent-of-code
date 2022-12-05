// Read the file
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
const inputSections: string[] = data.toString().split("\n\n");
const instructions: string[] = inputSections[1].split("\n");
var lines: string[][] = inputSections[0].split("\n").map(x=> x.split(""));

// Drop the number line
lines.pop();

// Transpose / rotate array stolen from SO https://stackoverflow.com/a/17428705
var columns = lines[0].map((_, colIndex) => lines.map(row => row[colIndex]));

// Remove the lines that are just spaces or [] so we only have "real" colums
columns = columns.filter(column => column.some(item => item != " " && item != "[" && item != "]"));

// Remove spaces
columns = columns.map(column => column.filter(item => item != " "));

// Flip columns so top items are at the end of the array
columns = columns.map(column => column.reverse());

// How the fuck is this the best way to deep copy an array in JS?!
var startingColumns = JSON.parse(JSON.stringify(columns));

// Part 1
for (const instruction of instructions) {
	const bits = instruction.split(" ");
	const moveAmount = parseInt(bits[1]);
	const fromColumn = parseInt(bits[3]) - 1;
	const toColumn = parseInt(bits[5]) - 1;
	for (var i = 0; i < moveAmount; i++) {
		var item = columns[fromColumn].pop();
		columns[toColumn].push(item!);
	}
}
const topItems = columns.reduce((accumulator, column) => accumulator += column[column.length - 1], "");
console.log("Part 1: " + topItems);

// Part 2
columns = startingColumns;
for (const instruction of instructions) {
	const bits = instruction.split(" ");
	const moveAmount = parseInt(bits[1]);
	const fromColumn = parseInt(bits[3]) - 1;
	const toColumn = parseInt(bits[5]) - 1;
	var items: string[] = [];
	for (var i = 0; i < moveAmount; i++) {
		var item = columns[fromColumn].pop();
		items.push(item!);
	}
	for (var i = items.length - 1; i >= 0; i--) {
		columns[toColumn].push(items[i]);
	}
}
const topItems2 = columns.reduce((accumulator, column) => accumulator += column[column.length - 1], "");
console.log("Part 2: " + topItems2);
