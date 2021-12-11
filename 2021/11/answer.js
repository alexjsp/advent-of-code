// Read the file
var fs = require('fs');
var path = require('path');
var data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');

class Board {
	constructor(boardString) {
		this.startingBoardString = boardString;
		this.setBoardFromString(boardString);
	}

	reset() {
		this.setBoardFromString(this.startingBoardString);
	}

	setBoardFromString(boardString) {
		this.board = boardString.split("\n").filter(l => l.length > 0).map(l => l.split("").map(i => parseInt(i)));
	}

	step() {
		var board = this.board;
		var flashCount = 0;
		for (var i = 0; i < board.length; i++) {
			for (var j = 0; j < board[i].length; j++) {
				board[i][j]++;
			}
		}
		var done = false;
		while (!done) {
			done = true;
			for (var i = 0; i < board.length; i++) {
				for (var j = 0; j < board[i].length; j++) {
					if (board[i][j] > 9) {
						board[i][j] = -1;
						done = false;
						flashCount++;
	
						this.incrementAdjacent(i,j);
					}				
				}
			}	
		}

		// Reset the flashed ones
		for (var i = 0; i < board.length; i++) {
			for (var j = 0; j < board[i].length; j++) {
				if (board[i][j] == -1) { board[i][j] = 0; }
			}
		}
	
		return flashCount;	
	}

	incrementAdjacent(x,y) {
		this.increment(x-1, y-1);
		this.increment(x-1, y);
		this.increment(x-1, y+1);
		this.increment(x, y-1);
		this.increment(x, y+1);
		this.increment(x+1, y-1);
		this.increment(x+1, y);
		this.increment(x+1, y+1);
	}

	increment(x,y) {
		if (x < 0) { return; }
		if (x >= this.board.length) { return; }
		if (y < 0) { return; }
		if (y >= this.board[x].length) { return; }

		if (this.board[x][y] == -1) { return; }

		this.board[x][y]++;
	}

	print(){
		console.log(this.board.map(x => x.join("")).join("\n") + "\n");
	}

	get size() {
		return this.board.length * this.board[0].length;
	}
}

var board = new Board(data.toString());

// Part 1
console.log("--------- Part 1 ---------");
console.log("Answer: " + performSteps(board, 100));
console.log("");

// Part 2
board.reset();
console.log("--------- Part 2 ---------");
console.log("Answer: " + findSimultaneousFlashStep(board));


// Helpers

function performSteps(board, count) {
	var flashCount = 0;
	// board.print();
	for (var i = 0; i < count; i++) {
		flashCount += board.step();
		// console.log("After step " + (i+1) + ":");
		// board.print();
	}
	return flashCount;
}

function findSimultaneousFlashStep(board) {
	var boardSize = board.size;
	for (var i = 1; i < 1000000; i++) {
		var flashCount = board.step();
		if (flashCount == boardSize) {
			return i;
		}
	}
}