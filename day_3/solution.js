/*
---------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------
-----------------------------------------   PROBLEM STATEMENT --- Day 3: Lobby --- https://adventofcode.com/2025/day/3 -----------------------------------------
-----------------------------------------   SOLUTION    -----------------------------------------
---------------------------------------------------------------------------------------------------------
*/

const fs = require("fs");
const path = require("path");

// Function to read input from a file and return an array of battery banks
function readInput(filePath) {
  const data = fs.readFileSync(path.resolve(__dirname, filePath), "utf-8");
  return data.trim().split("\n");
}

// Function to find max joltage by selecting 'count' batteries
function calculateMaxJoltageForCount(bank, count) {
  const length = bank.length;
  const toRemove = length - count;

  if (toRemove === 0) {
    return parseInt(bank, 10);
  }

  if (count === 0) {
    return 0;
  }

  const digits = bank.split("");
  const result = [];
  let removed = 0;

  for (let i = 0; i < length; i++) {
    // How many digits do we still need to select?
    const needed = count - result.length;

    // How many digits are left including current?
    const remaining = length - i;

    // If we have exactly as many remaining as we need, take them all
    if (remaining === needed) {
      result.push(digits[i]);
      continue;
    }

    // Remove smaller digits from result if we found a larger one and we can afford it
    while (
      result.length > 0 &&
      removed < toRemove &&
      result[result.length - 1] < digits[i]
    ) {
      result.pop();
      removed++;
    }

    result.push(digits[i]);
  }

  // If we still need to remove digits, remove from the end
  while (result.length > count) {
    result.pop();
  }

  return parseInt(result.join(""), 10);
}

// Function to calculate the total maximum joltage output (Part 1)
function calculateTotalMaxJoltagePart1(banks) {
  let totalJoltage = 0;

  banks.forEach((bank) => {
    const maxJoltage = calculateMaxJoltageForCount(bank, 2);
    totalJoltage += maxJoltage;
  });

  return totalJoltage;
}

// Function to calculate the total maximum joltage output (Part 2)
function calculateTotalMaxJoltagePart2(banks) {
  let totalJoltage = 0;

  banks.forEach((bank) => {
    const maxJoltage = calculateMaxJoltageForCount(bank, 12);
    totalJoltage += maxJoltage;
  });

  return totalJoltage;
}

// Main execution
const inputFilePath = "input.txt"; // Adjust the path as necessary
const batteryBanks = readInput(inputFilePath);

console.log("Executing Part 1...");
const totalMaxJoltagePart1 = calculateTotalMaxJoltagePart1(batteryBanks);
console.log(`Part 1 - The total output joltage is: ${totalMaxJoltagePart1}\n`);

console.log("Executing Part 2...");
const totalMaxJoltagePart2 = calculateTotalMaxJoltagePart2(batteryBanks);
console.log(`Part 2 - The total output joltage is: ${totalMaxJoltagePart2}`);
