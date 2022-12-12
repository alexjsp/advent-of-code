// Read the file
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
const monkeyStrings: string[] = data.toString().split("\n\n");

type Monkey = {
    items: number[],
    inspectionCount: number,
    testDivisableBy: number,
    testTrueThrowTo: number,
    testFalseThrowTo: number,
    operation: (value: number) => number,
}

function loadMonkeysFromStrings(monkeyStrings: string[]) {
    return monkeyStrings.map(m => {
       var regex = /.*items: (?<items>.*)\n.*Operation: new = (?<operation>.*)\n.*Test: divisible by (?<divisibleBy>\d+)\n.*true: throw to monkey (?<trueMonkey>\d+)\n.*false: throw to monkey (?<falseMonkey>\d+)/;
       var groups = m.match(regex)!.groups!;
       var op = groups.operation;
       var monkey: Monkey = {
          items: groups.items.split(", ").map(i => parseInt(i)),
          inspectionCount: 0,
          testDivisableBy: parseInt(groups.divisibleBy),
          testTrueThrowTo: parseInt(groups.trueMonkey),
          testFalseThrowTo: parseInt(groups.falseMonkey),
          operation: (value: number) => { return eval(op.replaceAll("old", value.toString())); } // eval yolo
       }
       return monkey;
    });
}

function inspectionCountMonkeySorter(m1: Monkey, m2: Monkey) {
   // Sort highest inspection count first
    if (m1.inspectionCount > m2.inspectionCount) { return -1; }
    else if (m1.inspectionCount < m2.inspectionCount) { return 1; }
    return 0;
}

// Part 1
var monkeys = loadMonkeysFromStrings(monkeyStrings);
for (var i = 0; i < 20; i++) {
   for (var monkey of monkeys) {
      while (monkey.items.length > 0) {
         var item = monkey.items.shift()!;
         item = monkey.operation(item);
         monkey.inspectionCount++;
         item = Math.floor(item / 3);
         const throwToMonkey = item % monkey.testDivisableBy == 0 ? monkey.testTrueThrowTo : monkey.testFalseThrowTo;
         monkeys[throwToMonkey].items.push(item);
      }
   }
}
monkeys.sort(inspectionCountMonkeySorter);
var monkeyBusiness = monkeys[0].inspectionCount * monkeys[1].inspectionCount;
console.log("Part 1: " + monkeyBusiness);

// Part 2
var productOfDivisibleTests = monkeys.reduce((a, m) => a*m.testDivisableBy, 1);
monkeys = loadMonkeysFromStrings(monkeyStrings);
for (var i = 0; i < 10000; i++) {
   for (var monkey of monkeys) {
      while (monkey.items.length > 0) {
         var item = monkey.items.shift()!;
         item = monkey.operation(item);
         monkey.inspectionCount++;
         item = item % productOfDivisibleTests; // This keeps the worry level down without invalidating the divisible test
         const throwToMonkey = item % monkey.testDivisableBy == 0 ? monkey.testTrueThrowTo : monkey.testFalseThrowTo;
         monkeys[throwToMonkey].items.push(item);
      }
   }
}
monkeys.sort(inspectionCountMonkeySorter);
var monkeyBusiness = monkeys[0].inspectionCount * monkeys[1].inspectionCount;
console.log("Part 2: " + monkeyBusiness);
