/*
---------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------
-----------------------------------------   PROBLEM STATEMENT --- Day 1: Secret Entrance --- https://adventofcode.com/2025/day/1 -----------------------------------------
-----------------------------------------   SOLUTION    -----------------------------------------
---------------------------------------------------------------------------------------------------------
*/

const fs = require("fs");
const path = require("path");

function readInput(filePath) {
  return fs
    .readFileSync(path.resolve(__dirname, filePath), "utf-8")
    .trim()
    .split("\n");
}

function calculatePasswordPart1(rotations) {
  let dialPosition = 50;
  let zeroCount = 0;

  rotations.forEach((rotation) => {
    const direction = rotation[0];
    const distance = parseInt(rotation.slice(1), 10);

    if (direction === "L") {
      dialPosition = (dialPosition - distance + 100) % 100;
    } else if (direction === "R") {
      dialPosition = (dialPosition + distance) % 100;
    }

    if (dialPosition === 0) {
      zeroCount++;
    }
  });

  return zeroCount;
}

function calculatePasswordPart2(rotations) {
  let dialPosition = 50;
  let zeroCount = 0;

  rotations.forEach((rotation) => {
    const direction = rotation[0];
    const distance = parseInt(rotation.slice(1), 10);

    // Count zero crossings during the rotation
    for (let i = 1; i <= distance; i++) {
      if (direction === "L") {
        dialPosition = (dialPosition - 1 + 100) % 100;
      } else if (direction === "R") {
        dialPosition = (dialPosition + 1) % 100;
      }

      if (dialPosition === 0) {
        zeroCount++;
      }
    }
  });

  return zeroCount;
}

const rotations = readInput("input.txt");
const passwordPart1 = calculatePasswordPart1(rotations);
const passwordPart2 = calculatePasswordPart2(rotations);
console.log(`Part 1 - The password to open the door is: ${passwordPart1}`);
console.log(
  `Part 2 - The password using method 0x434C49434B is: ${passwordPart2}`
);
