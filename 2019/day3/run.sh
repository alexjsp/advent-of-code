#!/usr/bin/swift

import Foundation

let inputURL: URL = URL(fileURLWithPath: "input.txt")

if let inputString = try? String(contentsOf: inputURL, encoding: .utf8) {
	// Given examples
	// let inputString = "R8,U5,L5,D3\nU7,R6,D4,L4"
	// let inputString = "R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83"
	// let inputString = "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51,\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7"
	let wires = inputString.split(separator: "\n")
	var points: [String: [Int]] = [:]
	var stepsToPoint: [String: [Int: Int]] = [:]
	var wireNumber = 0
	for wire in wires {
		var x = 0
		var y = 0
		var steps = 0
		let instructions = wire.split(separator: ",")
		for instruction in instructions {
			let direction = instruction.prefix(1)
			let distance = Int(instruction.suffix(instruction.count - 1)) ?? 0
			for _ in 0...(distance-1) {
				switch direction {
				case "U":
					y+=1
				case "D":
					y-=1
				case "R":
					x+=1
				case "L":
					x-=1
				default:
					break
				}
				let pointString = String(x)+","+String(y)
				if points[pointString] != nil {
					if points[pointString]?.contains(wireNumber) == false {
						points[pointString]?.append(wireNumber)
					}
				}
				else {
					points[pointString] = [wireNumber]
				}
				
				steps += 1
				
				if stepsToPoint[pointString] != nil {
					stepsToPoint[pointString]![wireNumber] = steps
				}
				else {
					stepsToPoint[pointString] = [wireNumber: steps]
				}			
			}
		}
		wireNumber += 1
	}
	var shortestManhattanDistance = 0
	var shortestStepsDistance = 0
	for (pointString, wires) in points {
		if wires.count == 1 { continue }

		let coords = pointString.split(separator: ",")
		let x = Int(coords[0]) ?? 0
		let y = Int(coords[1]) ?? 0
		let manhattanDistance = abs(x) + abs(y)
		if shortestManhattanDistance == 0 || manhattanDistance < shortestManhattanDistance {
			shortestManhattanDistance = manhattanDistance
		}
		
		let stepsDistanceDictionary = stepsToPoint[pointString]!
		var stepsDistance = 0
		for (_, steps) in stepsDistanceDictionary {
			stepsDistance += steps
		}
		if shortestStepsDistance == 0 || stepsDistance < shortestStepsDistance {
			shortestStepsDistance = stepsDistance
		}
	}
	print ("Part 1 Answer: " + String(shortestManhattanDistance))
	print ("Part 2 Answer: " + String(shortestStepsDistance))
}
