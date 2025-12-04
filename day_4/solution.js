/*
---------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------
-----------------------------------------   PROBLEM STATEMENT --- Day 4: Printing Department --- https://adventofcode.com/2025/day/4 -----------------------------------------
-----------------------------------------   SOLUTION    -----------------------------------------
---------------------------------------------------------------------------------------------------------
*/

const fs = require("fs");

function readInputFile(filePath) {
  return fs.readFileSync(filePath, "utf-8").trim().split("\n");
}

function countAccessibleRolls(grid) {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  let accessibleCount = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "@") {
        let adjacentRolls = 0;

        for (const [dx, dy] of directions) {
          const x = i + dx;
          const y = j + dy;

          if (x >= 0 && x < grid.length && y >= 0 && y < grid[i].length) {
            if (grid[x][y] === "@") {
              adjacentRolls++;
            }
          }
        }

        if (adjacentRolls < 4) {
          accessibleCount++;
        }
      }
    }
  }

  return accessibleCount;
}

function removeAccessibleRolls(grid) {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  let totalRemoved = 0;
  let removed = true;

  while (removed) {
    removed = false;
    const toRemove = [];

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === "@") {
          let adjacentRolls = 0;

          for (const [dx, dy] of directions) {
            const x = i + dx;
            const y = j + dy;

            if (x >= 0 && x < grid.length && y >= 0 && y < grid[i].length) {
              if (grid[x][y] === "@") {
                adjacentRolls++;
              }
            }
          }

          if (adjacentRolls < 4) {
            toRemove.push([i, j]);
          }
        }
      }
    }

    for (const [i, j] of toRemove) {
      grid[i] = grid[i].split("");
      grid[i][j] = ".";
      grid[i] = grid[i].join("");
      totalRemoved++;
      removed = true;
    }
  }

  return totalRemoved;
}

const inputFilePath = "input.txt";
const grid = readInputFile(inputFilePath);

// Part 1
const part1Result = countAccessibleRolls(grid);
console.log(`Part 1 - Number of accessible rolls of paper: ${part1Result}`);

// Part 2
const gridCopy = grid.map((row) => row);
const part2Result = removeAccessibleRolls(gridCopy);
console.log(`Part 2 - Total rolls of paper removed: ${part2Result}`);
