// Read the file
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
const lines: string[] = data.toString().split("\n");
var gridChars = lines.map(s => s.split(""));

var startX = -1;
var startY = -1;
var endX = -1;
var endY = -1;
for (var y = 0; y < gridChars.length; y++) {
   for (var x = 0; x < gridChars[y].length; x++) {
      if (gridChars[y][x] == "S") {
         startX = x;
         startY = y;
         gridChars[y][x] = "a";
      }
      else if (gridChars[y][x] == "E") {
         endX = x;
         endY = y;
         gridChars[y][x] = "z";
      }
   }
}

type Node = {
   x: number,
   y: number,
   height: number,
   parent?: Node,
   
   cost: number,
}

function findPath(startX: number, startY: number, endX: number, endY: number, gridChars: string[][]): Node[] {
   var startNode: Node = {x: startX, y: startY, height: 1, cost: 0};
   
   // Mediocre implementation of A* (star) Pathfinding
   // Initialize both open and closed list
   var openList: Node[] = [startNode]
   var closedList: Node[] = []
   var nodePath: Node[] = []
   
   // Loop until you find the end
   while (openList.length > 0) {
      
      var currentNode = openList[0];
      var currentIndex = 0;
      for (var i = 1; i < openList.length; i++) {
         if (openList[i].cost < currentNode.cost) {
            currentNode = openList[i];
            currentIndex = i;
         }
      }
      openList.splice(currentIndex, 1);
      closedList.push(currentNode);
               
      // Found the end
      if (currentNode.x == endX && currentNode.y == endY) {
         var c: Node = currentNode
         nodePath.push(c);
         while (c.parent != undefined) {
            c = c.parent;
            nodePath.push(c);
         }
         nodePath = nodePath.reverse();
         return nodePath;
      }
      
      // Generate children
      var children: Node[] = []
      for (var y = Math.max(0, currentNode.y - 1); y <= Math.min(gridChars.length - 1, currentNode.y + 1); y++) {
         for (var x = Math.max(0, currentNode.x - 1); x <= Math.min(gridChars[y].length - 1, currentNode.x + 1); x++) {
            if (x==currentNode.x && y==currentNode.y) { continue; }
            if (x!=currentNode.x && y!=currentNode.y) { continue; }
            const height = gridChars[y][x].charCodeAt(0) - 96;
            
            // If we can't move there, ignore it.
            if (currentNode.height - height < -1) {
               continue;
            }
            
            const newNode: Node = {x: x, y: y, height: height, cost: 0, parent: currentNode};
            children.push(newNode);
         }
      }
      
      for (const child of children) {
         var inClosedList = false;
         for (const closedChild of closedList) {
            if (closedChild.x == child.x && closedChild.y == child.y) { 
               inClosedList = true;
               break;
            }
         }
         if (inClosedList) { continue; }
         
         child.cost = currentNode.cost + 1;
         
         var betterNodeInOpenList = false;
         for (const openChild of openList) {
            if (openChild.x == child.x && openChild.y == child.y && child.cost >= openChild.cost) {
               betterNodeInOpenList = true;
               break;
            }
         }
         if (betterNodeInOpenList) { continue; }
         
         openList.push(child);
      }
   }
   return nodePath;
}

// Part 1
var part1Path = findPath(startX, startY, endX, endY, gridChars);
if (part1Path.length == 0) {
   console.log("Part 1: ⚠️ Failed to find path to target!");
}
else {
   console.log("Part 1: The goal can be reached in "+(part1Path.length - 1)+" steps.");
}

// Part 2
var shortestPath = part1Path.length;
for (y = 0; y < gridChars.length; y++) {
   for (x = 0; x < gridChars[y].length; x++) {
      if (gridChars[y][x] == "a") {
         var nodePath = findPath(x, y, endX, endY, gridChars);
         if (nodePath.length > 0 && nodePath.length < shortestPath) { shortestPath = nodePath.length; }
      }
   }
}
console.log("Part 2: The goal can be reached in "+(shortestPath - 1)+" steps.");
