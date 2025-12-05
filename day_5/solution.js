/*
---------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------
-----------------------------------------   PROBLEM STATEMENT --- Day 5: Cafeteria --- https://adventofcode.com/2025/day/5 -----------------------------------------
-----------------------------------------   SOLUTION    -----------------------------------------
---------------------------------------------------------------------------------------------------------
*/

const fs = require("fs");
const path = require("path");

function readInputFile(filePath) {
  return fs.readFileSync(filePath, "utf-8").trim().split("\n");
}

function parseInput(lines) {
  let i = 0;
  const ranges = [];

  // Parse ranges until we hit a blank line
  while (i < lines.length && lines[i].trim() !== "") {
    const parts = lines[i].split("-");
    const start = parseInt(parts[0], 10);
    const end = parseInt(parts[1], 10);
    ranges.push({ start, end });
    i++;
  }

  // Skip the blank line
  i++;

  // Parse ingredient IDs
  const ingredientIds = [];
  while (i < lines.length) {
    const id = parseInt(lines[i], 10);
    if (!isNaN(id)) {
      ingredientIds.push(id);
    }
    i++;
  }

  return { ranges, ingredientIds };
}

function isFresh(id, ranges) {
  return ranges.some((range) => id >= range.start && id <= range.end);
}

function countFreshIngredients(ranges, ingredientIds) {
  return ingredientIds.filter((id) => isFresh(id, ranges)).length;
}

function mergeRanges(ranges) {
  if (ranges.length === 0) return [];

  // Sort ranges by start position
  const sorted = ranges.sort((a, b) => a.start - b.start);

  const merged = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const last = merged[merged.length - 1];

    if (current.start <= last.end + 1) {
      // Overlapping or adjacent ranges - merge them
      last.end = Math.max(last.end, current.end);
    } else {
      // Non-overlapping range - add it
      merged.push(current);
    }
  }

  return merged;
}

function countAllFreshIds(ranges) {
  const merged = mergeRanges(ranges);
  let count = 0;

  for (const range of merged) {
    count += range.end - range.start + 1;
  }

  return count;
}

const inputFilePath = path.join(__dirname, "input.txt");
const lines = readInputFile(inputFilePath);
const { ranges, ingredientIds } = parseInput(lines);

// Part 1
const freshCount = countFreshIngredients(ranges, ingredientIds);
console.log(`Part 1 - Number of fresh ingredient IDs: ${freshCount}`);

// Part 2
const allFreshCount = countAllFreshIds(ranges);
console.log(
  `Part 2 - Total ingredient IDs considered fresh by ranges: ${allFreshCount}`
);
