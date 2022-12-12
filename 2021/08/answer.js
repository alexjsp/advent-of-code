// Classes
function arraysEqual(a1,a2) {
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
	// JS is dumb
    return JSON.stringify(a1)==JSON.stringify(a2);
}

class Entry {
	constructor(entryString) {
		var parts = entryString.split(" | ");
		this.signalPattern = parts[0].split(" ").map(s => s.split(""));
		this.output = parts[1].split(" ").map(s => s.split(""));
		for (var i = 0; i < this.signalPattern.length; i++) { this.signalPattern[i].sort(); }
		for (var i = 0; i < this.output.length; i++) { this.output[i].sort(); }
	}

	get numberOfUniqueOutputValues() {
		return this.output.filter(v => (v.length == 2 || v.length == 3 || v.length == 4 || v.length == 7)).length;
	}

	get outputValue() {
		var oneV = this.oneValue;
		var fourV = this.fourValue;
		var sevenV = this.sevenValue;
		var eightV = this.eightValue;
		var nineV = this.signalPattern.find(v => v.length == 6 && fourV.every(c => v.includes(c)));
		var sixV = this.signalPattern.find(v => v.length == 6 && !arraysEqual(v, nineV) && !oneV.every(c => v.includes(c)));
		var zeroV = this.signalPattern.find(v => v.length == 6 && !arraysEqual(v, nineV) && !arraysEqual(v, sixV));
		var fiveV = this.signalPattern.find(v => v.length == 5 && v.every(c => sixV.includes(c)));
		var threeV = this.signalPattern.find(v => v.length == 5 && oneV.every(c => v.includes(c)));
		var twoV = this.signalPattern.find(v => v.length == 5 && !arraysEqual(v, fiveV) && !arraysEqual(v, threeV));

		var vals = [zeroV, oneV, twoV, threeV, fourV, fiveV, sixV, sevenV, eightV, nineV];

		var outputText = "";
		for (var i = 0; i < this.output.length; i++) {
			var o = this.output[i];
			for (var j = 0; j < vals.length; j++) {
				if (arraysEqual(o, vals[j])) {
					outputText += j;
					break;
				}
			}
		}

		return parseInt(outputText);
	}

	get oneValue() { return this.signalPattern.find(v => v.length == 2); }
	get fourValue() { return this.signalPattern.find(v => v.length == 4); }
	get sevenValue() { return this.signalPattern.find(v => v.length == 3); }
	get eightValue() { return this.signalPattern.find(v => v.length == 7); }
}

// Read the file
var fs = require('fs');
var path = require('path');
var data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
var entries = data.toString().split("\n").map(e => new Entry(e));

// Part 1
console.log("");
console.log("--------- Part 1 ---------");
var uniques = 0;
for (var i = 0; i < entries.length; i++) {
	uniques += entries[i].numberOfUniqueOutputValues;
}
console.log("Answer: "+uniques);

console.log("");
console.log("--------- Part 2 ---------");
var total = 0;
for (var i = 0; i < entries.length; i++) {
	total += entries[i].outputValue;
}
console.log("Answer: "+total);