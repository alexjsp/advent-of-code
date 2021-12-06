#!/usr/bin/swift

import Foundation

let inputURL: URL = URL(fileURLWithPath: "input.txt")

if let inputString = try? String(contentsOf: inputURL, encoding: .utf8) {
	let orbitStrings = inputString.split(separator: "\n")
	for orbitString in orbitStrings {
		orbits = orbitString.split(separator: ")")
	}
}