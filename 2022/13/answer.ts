// Read the file
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
const debugPrint = false;

function debugLog(print: any, debugLevel: number) {
   var string = "";
   for (var i = 0; i < debugLevel; i++) { string+="  "; }
   string+=print;
   if (debugPrint) { console.log(string); }
}

function compareValues(a: any,b: any, debugLevel = 0): number {
   debugLog("- Compare "+JSON.stringify(a)+" vs " +JSON.stringify(b), debugLevel);
   if (typeof a === "number" && typeof b === "number") {
       if (a < b) {
          debugLog("- Left side is smaller, so inputs are in the right order", debugLevel);
          return 1;
       }
       else if (a > b) {
          debugLog("- Right side is smaller, so inputs are *not* in the right order", debugLevel);
          return -1;
       }
       else { return 0; }
   }
   else if (typeof a === "number" && typeof b === "object") {
      return compareValues([a], b, debugLevel+1);
   }
   else if (typeof a === "object" && typeof b === "number") {
      return compareValues(a, [b], debugLevel+1);
   }
   else if (typeof a === "object" && typeof b === "object") {
      for (var i = 0; i < a.length && i < b.length; i++) {
         const result = compareValues(a[i], b[i], debugLevel+1);
         if (result != 0) { return result; }
      }
      if (a.length < b.length) {
         debugLog("- Left side ran out of items, so inputs are in the right order", debugLevel+1);
         return 1;
      }
      else if (a.length > b.length){
         debugLog("- Right side ran out of items, so inputs are *not* in the right order", debugLevel+1);
         return -1;
      }
      else {
         return 0;
      }
   }
   else {
      console.log("⚠️ Unreachable!");
   }
   
   return -1;
}

// Part 1
const pairStrings: string[] = data.toString().split("\n\n");
const pairs = pairStrings.map(pairString => pairString.split("\n").map(s => JSON.parse(s)));
var sumOfCorrectlyOrderedPairIndices = 0;
for (var i = 0; i < pairs.length; i++){
   var pair = pairs[i];
   var a = pair[0];
   var b = pair[1];
   
   var index = i+1;
   
   debugLog("\n== Pair "+(index)+" ==", 0);
   
   if (compareValues(a, b, 0) == 1) { sumOfCorrectlyOrderedPairIndices+=index; }
}
debugLog("", 0);
console.log("Part 1: "+sumOfCorrectlyOrderedPairIndices);

// Part 2
const packetLines: string[] = data.toString().split("\n");
var packets = packetLines.filter(p => p!="").map(s => JSON.parse(s));
var decoderPacket1 = [[2]];
var decoderPacket2 = [[6]];
packets.push(decoderPacket1);
packets.push(decoderPacket2);
packets.sort(compareValues);
packets = packets.reverse();
const packetStrings = packets.map(p => JSON.stringify(p));
const decoderKey = (packetStrings.indexOf(JSON.stringify(decoderPacket1)) + 1) * (packetStrings.indexOf(JSON.stringify(decoderPacket2)) + 1);
console.log("Part 2: "+decoderKey);
