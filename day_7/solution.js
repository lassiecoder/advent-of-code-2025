/*
---------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------
-----------------------------------------   PROBLEM STATEMENT --- Day 7: Laboratories --- https://adventofcode.com/2025/day/7 -----------------------------------------
-----------------------------------------   SOLUTION    -----------------------------------------
---------------------------------------------------------------------------------------------------------
*/

const fs = require("fs");
const path = require("path");

function readInputFile(filePath) {
  return fs.readFileSync(filePath, "utf-8").trim().split("\n");
}

function simulateTachyonBeams(grid) {
  // Find starting position S
  let startCol = -1;
  let startRow = -1;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "S") {
        startRow = i;
        startCol = j;
        break;
      }
    }
    if (startCol !== -1) break;
  }

  // Simulate beams - each beam moves downward from its starting position
  // Track active beams: {col, splitsSeen}
  let beams = [{ col: startCol }];
  let totalSplits = 0;
  let currentRow = startRow + 1;

  // Process row by row, moving downward
  while (currentRow < grid.length && beams.length > 0) {
    const newBeams = [];
    const seenCols = new Set();

    for (const beam of beams) {
      const cell = grid[currentRow][beam.col];

      if (cell === "^") {
        // Beam hits a splitter - it splits into left and right
        totalSplits++;
        // Add left beam
        if (beam.col - 1 >= 0 && !seenCols.has(beam.col - 1)) {
          newBeams.push({ col: beam.col - 1 });
          seenCols.add(beam.col - 1);
        }
        // Add right beam
        if (
          beam.col + 1 < grid[currentRow].length &&
          !seenCols.has(beam.col + 1)
        ) {
          newBeams.push({ col: beam.col + 1 });
          seenCols.add(beam.col + 1);
        }
      } else if (cell === "." || cell === "S") {
        // Beam continues downward
        if (!seenCols.has(beam.col)) {
          newBeams.push(beam);
          seenCols.add(beam.col);
        }
      }
    }

    beams = newBeams;
    currentRow++;
  }

  return totalSplits;
}

const inputFilePath = path.join(__dirname, "input.txt");
const grid = readInputFile(inputFilePath);

// Find starting position S
let startCol = -1;
let startRow = -1;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] === "S") {
      startRow = i;
      startCol = j;
      break;
    }
  }
  if (startCol !== -1) break;
}

// Part 1
const splitCount = simulateTachyonBeams(grid);
console.log(`Part 1 - Tachyon beam splits: ${splitCount}`);

// Part 2: Count unique timelines using DP
// For each cell, count how many different timelines reach it
function countTimelines(grid, startRow, startCol) {
  const lastRow = grid.length - 1;

  // dp[row][col] = number of particles reaching this cell
  const dp = Array(grid.length)
    .fill(null)
    .map((_, i) => Array(grid[i] ? grid[i].length : 0).fill(0n));

  dp[startRow][startCol] = 1n;

  for (let row = startRow; row < lastRow; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (dp[row][col] === 0n) continue;

      const cell = grid[row][col];

      if (cell === "^") {
        // Splitter - particles split left and right
        if (col - 1 >= 0) {
          dp[row + 1][col - 1] += dp[row][col];
        }
        if (col + 1 < grid[row].length) {
          dp[row + 1][col + 1] += dp[row][col];
        }
      } else {
        // Continue downward
        dp[row + 1][col] += dp[row][col];
      }
    }
  }

  // Sum all particles at the bottom row
  return Number(dp[lastRow].reduce((a, b) => a + b, 0n));
}

const timelineCount = countTimelines(grid, startRow, startCol);
console.log(`Part 2 - Timelines: ${timelineCount}`);
