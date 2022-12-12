// Read the file
var fs = require('fs');
var path = require('path');
var data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
var numbers = data.toString().split("\n").filter(x => x.length > 0).map(x => x.split(""));

// Part 1
function mostCommonBitInPosition(numbers, position) {
	var values = numbers.map(x => x[position]);
	return values.filter(x => x == "1").length >= numbers.length / 2 ? "1" : "0";
}

function leastCommonBitInPosition(numbers, position) {
	return mostCommonBitInPosition(numbers, position) == "1" ? "0" : "1";
}

var gammaRate = "";
var epsilonRate = "";
for (var i = 0; i < numbers[0].length; i++) {
	gammaRate += mostCommonBitInPosition(numbers, i);
	epsilonRate += leastCommonBitInPosition(numbers, i);
}
var gammaRateDecimal = parseInt(gammaRate, 2);
var epsilonRateDecimal = parseInt(epsilonRate, 2);

console.log("");
console.log("--------- Part 1 ---------");
console.log("Gamma Rate: " + gammaRate + " (" + gammaRateDecimal + ")");
console.log("Epsilon Rate: " + epsilonRate + " (" + epsilonRateDecimal + ")");
console.log("Answer: " + (gammaRateDecimal * epsilonRateDecimal));

// Part 2
console.log("");
console.log("--------- Part 2 ---------");
var viableOxygenRatings = numbers;
for (var i = 0; i < numbers[0].length; i++) {
	if (viableOxygenRatings.length < 2) {
		break;
	}

	var mostCommonBit = mostCommonBitInPosition(viableOxygenRatings, i);
	viableOxygenRatings = viableOxygenRatings.filter(x => x[i] == mostCommonBit);
}
var oxygenGeneratorRating = viableOxygenRatings[0].join("");
var oxygenGeneratorRatingDecimal = parseInt(oxygenGeneratorRating, 2);
console.log("Oxygen Generator Rating: " + oxygenGeneratorRating + " (" + oxygenGeneratorRatingDecimal + ")");

var viableCO2Ratings = numbers;
for (var i = 0; i < numbers[0].length; i++) {
	if (viableCO2Ratings.length < 2) {
		break;
	}

	var leastCommonBit = leastCommonBitInPosition(viableCO2Ratings, i);
	viableCO2Ratings = viableCO2Ratings.filter(x => x[i] == leastCommonBit);
}
var co2Rating = viableCO2Ratings[0].join("");
var co2RatingDecimal = parseInt(co2Rating, 2);
console.log("CO2 Scrubber Rating: " + co2Rating + " (" + co2RatingDecimal + ")");
console.log("Answer: " + (oxygenGeneratorRatingDecimal * co2RatingDecimal));
