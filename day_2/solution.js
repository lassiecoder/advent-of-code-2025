/*
---------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------
-----------------------------------------   PROBLEM STATEMENT --- Day 2: Gift Shop --- https://adventofcode.com/2025/day/2 -----------------------------------------
-----------------------------------------   SOLUTION    -----------------------------------------
---------------------------------------------------------------------------------------------------------
*/

const fs = require("fs");
const path = require("path");

// Function to check if a number is an invalid product ID (Part 1)
function isInvalidProductIDPart1(num) {
  const strNum = num.toString();
  const len = strNum.length;

  // Invalid IDs must have even length
  if (len % 2 !== 0) return false;

  const half = len / 2;
  const firstHalf = strNum.slice(0, half);
  const secondHalf = strNum.slice(half);

  return firstHalf === secondHalf;
}

// Function to check if a number is an invalid product ID (Part 2)
function isInvalidProductIDPart2(num) {
  const strNum = num.toString();
  const len = strNum.length;

  // Try all possible pattern lengths (1 to len/2)
  for (let patternLen = 1; patternLen <= len / 2; patternLen++) {
    // Pattern must repeat at least twice
    if (len % patternLen !== 0) continue;

    const pattern = strNum.slice(0, patternLen);
    let isValid = true;

    // Check if the entire string is the pattern repeated
    for (let i = 0; i < len; i += patternLen) {
      if (strNum.slice(i, i + patternLen) !== pattern) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      return true;
    }
  }

  return false;
}

// Function to calculate the sum of invalid product IDs in given ranges
function calculateInvalidProductIDsSumPart1(ranges) {
  let invalidSum = 0;

  for (const range of ranges) {
    const [start, end] = range.split("-").map(Number);

    for (let id = start; id <= end; id++) {
      if (isInvalidProductIDPart1(id)) {
        invalidSum += id;
      }
    }
  }

  return invalidSum;
}

// Function to calculate the sum of invalid product IDs in given ranges (Part 2)
function calculateInvalidProductIDsSumPart2(ranges) {
  let invalidSum = 0;

  for (const range of ranges) {
    const [start, end] = range.split("-").map(Number);

    for (let id = start; id <= end; id++) {
      if (isInvalidProductIDPart2(id)) {
        invalidSum += id;
      }
    }
  }

  return invalidSum;
}
// Read input from file
function readInput(filePath) {
  return fs
    .readFileSync(path.resolve(__dirname, filePath), "utf-8")
    .trim()
    .split(",");
}

// Main execution
const inputFilePath = "input.txt"; // Adjust the path as necessary
const ranges = readInput(inputFilePath);
const resultPart1 = calculateInvalidProductIDsSumPart1(ranges);
const resultPart2 = calculateInvalidProductIDsSumPart2(ranges);
console.log(`Part 1 - The sum of all invalid product IDs is: ${resultPart1}`);
console.log(
  `Part 2 - The sum of all invalid product IDs (new rules) is: ${resultPart2}`
);
