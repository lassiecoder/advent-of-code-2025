/*
---------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------
-----------------------------------------   PROBLEM STATEMENT --- Day 6: Trash Compactor --- https://adventofcode.com/2025/day/6 -----------------------------------------
-----------------------------------------   SOLUTION    -----------------------------------------
---------------------------------------------------------------------------------------------------------
*/

const fs = require("fs");
const path = require("path");

function readInputFile(filePath) {
  return fs.readFileSync(filePath, "utf-8").split("\n");
}

function parseWorksheet(lines) {
  if (lines.length === 0) return [];

  // Remove trailing empty lines
  while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
    lines.pop();
  }

  const width = Math.max(...lines.map((l) => l.length));

  // Pad all lines to the same width
  const paddedLines = lines.map((l) => l.padEnd(width, " "));

  // The last line contains operations
  const operationsLine = paddedLines[paddedLines.length - 1];
  const numberLines = paddedLines.slice(0, -1);

  // Find "problem blocks" - consecutive columns that have at least one operation
  // Blocks are separated by full columns of spaces
  const problems = [];
  let blockStart = null;
  let blockOperation = null;

  for (let col = 0; col < width; col++) {
    // Check if this column is all spaces (separator)
    let isAllSpaces = true;
    for (const row of numberLines) {
      if (row[col] !== " ") {
        isAllSpaces = false;
        break;
      }
    }

    const hasOperation =
      operationsLine[col] === "+" || operationsLine[col] === "*";

    if (!isAllSpaces || hasOperation) {
      // This column is part of a problem block
      if (blockStart === null) {
        blockStart = col;
        blockOperation = operationsLine[col];
      }
    } else {
      // This is a separator column - end current block
      if (blockStart !== null) {
        // Extract numbers from blockStart to col-1
        const numbers = [];
        for (const row of numberLines) {
          const substring = row.substring(blockStart, col);
          const tokens = substring.split(/\s+/).filter((t) => t.length > 0);
          for (const token of tokens) {
            if (/^\d+$/.test(token)) {
              numbers.push(parseInt(token, 10));
            }
          }
        }

        if (numbers.length > 0 && blockOperation) {
          problems.push({ numbers, operation: blockOperation });
        }

        blockStart = null;
        blockOperation = null;
      }
    }
  }

  // Don't forget the last block
  if (blockStart !== null) {
    const numbers = [];
    for (const row of numberLines) {
      const substring = row.substring(blockStart);
      const tokens = substring.split(/\s+/).filter((t) => t.length > 0);
      for (const token of tokens) {
        if (/^\d+$/.test(token)) {
          numbers.push(parseInt(token, 10));
        }
      }
    }

    if (numbers.length > 0 && blockOperation) {
      problems.push({ numbers, operation: blockOperation });
    }
  }

  return problems;
}

function solveProblem(problem) {
  const { numbers, operation } = problem;

  if (operation === "+") {
    return numbers.reduce((sum, num) => sum + num, 0);
  } else if (operation === "*") {
    return numbers.reduce((product, num) => product * num, 1);
  }

  return 0;
}

function getGrandTotal(problems) {
  return problems.reduce((total, problem) => total + solveProblem(problem), 0);
}

const inputFilePath = path.join(__dirname, "input.txt");
const lines = readInputFile(inputFilePath);
const problems = parseWorksheet(lines);

// Part 1
const grandTotal = getGrandTotal(problems);
console.log(`Part 1 - Grand total: ${grandTotal}`);

// Part 2: Read right-to-left, column by column
function parseWorksheetRightToLeft(lines) {
  if (lines.length === 0) return [];

  // Remove trailing empty lines
  while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
    lines.pop();
  }

  const width = Math.max(...lines.map((l) => l.length));

  // Pad all lines to the same width
  const paddedLines = lines.map((l) => l.padEnd(width, " "));

  // The last line contains operations
  const operationsLine = paddedLines[paddedLines.length - 1];
  const numberLines = paddedLines.slice(0, -1);

  // Read from right to left
  const problems = [];
  let blockEnd = width - 1;

  while (blockEnd >= 0) {
    // Skip trailing spaces
    while (blockEnd >= 0 && operationsLine[blockEnd] === " ") {
      let allSpaces = true;
      for (const row of numberLines) {
        if (row[blockEnd] !== " ") {
          allSpaces = false;
          break;
        }
      }
      if (allSpaces) {
        blockEnd--;
      } else {
        break;
      }
    }

    if (blockEnd < 0) break;

    // Find the start of this block (find where it starts from the right)
    let blockStart = blockEnd;
    while (blockStart >= 0) {
      let hasContent = false;
      const hasOp =
        operationsLine[blockStart] === "+" ||
        operationsLine[blockStart] === "*";

      for (const row of numberLines) {
        if (row[blockStart] !== " ") {
          hasContent = true;
          break;
        }
      }

      if (hasContent || hasOp) {
        blockStart--;
      } else {
        break;
      }
    }
    blockStart++;

    // Extract operation and numbers from this block
    const blockOperation = operationsLine[blockStart];
    const numbers = [];

    // Extract each column as a single digit, from right to left within the block
    for (let col = blockEnd; col >= blockStart; col--) {
      let digitStr = "";
      for (const row of numberLines) {
        if (row[col] !== " ") {
          digitStr += row[col];
        }
      }
      if (digitStr) {
        numbers.push(parseInt(digitStr, 10));
      }
    }

    if (numbers.length > 0 && blockOperation) {
      problems.push({ numbers, operation: blockOperation });
    }

    blockEnd = blockStart - 1;
  }

  return problems;
}

const problems2 = parseWorksheetRightToLeft(lines);
const grandTotal2 = getGrandTotal(problems2);
console.log(`Part 2 - Grand total: ${grandTotal2}`);
