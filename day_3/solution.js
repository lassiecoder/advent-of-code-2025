/*
---------------------------------------------------------------------------------------------------------
-----------------------------------------   PROBLEM STATEMENT   -----------------------------------------
---------------------------------------------------------------------------------------------------------

--- Day 3: Lobby ---

--- Part One ---

You descend a short staircase, enter the surprisingly vast lobby, and are quickly cleared by the security checkpoint. When you get to the main elevators, however, you discover that each one has a red light above it: they're all offline.

"Sorry about that," an Elf apologizes as she tinkers with a nearby control panel. "Some kind of electrical surge seems to have fried them. I'll try to get them online soon."

You explain your need to get further underground. "Well, you could at least take the escalator down to the printing department, not that you'd get much further than that without the elevators working. That is, you could if the escalator weren't also offline."

"But, don't worry! It's not fried; it just needs power. Maybe you can get it running while I keep working on the elevators."

There are batteries nearby that can supply emergency power to the escalator for just such an occasion. The batteries are each labeled with their joltage rating, a value from 1 to 9. You make a note of their joltage ratings (your puzzle input). For example:

987654321111111
811111111111119
234234234234278
818181911112111
The batteries are arranged into banks; each line of digits in your input corresponds to a single bank of batteries. Within each bank, you need to turn on exactly two batteries; the joltage that the bank produces is equal to the number formed by the digits on the batteries you've turned on. For example, if you have a bank like 12345 and you turn on batteries 2 and 4, the bank would produce 24 jolts. (You cannot rearrange batteries.)

You'll need to find the largest possible joltage each bank can produce. In the above example:

In 987654321111111, you can make the largest joltage possible, 98, by turning on the first two batteries.
In 811111111111119, you can make the largest joltage possible by turning on the batteries labeled 8 and 9, producing 89 jolts.
In 234234234234278, you can make 78 by turning on the last two batteries (marked 7 and 8).
In 818181911112111, the largest joltage you can produce is 92.
The total output joltage is the sum of the maximum joltage from each bank, so in this example, the total output joltage is 98 + 89 + 78 + 92 = 357.

There are many batteries in front of you. Find the maximum joltage possible from each bank; what is the total output joltage?


--- Part Two ---

The escalator doesn't move. The Elf explains that it probably needs more joltage to overcome the static friction of the system and hits the big red "joltage limit safety override" button. You lose count of the number of times she needs to confirm "yes, I'm sure" and decorate the lobby a bit while you wait.

Now, you need to make the largest joltage by turning on exactly twelve batteries within each bank.

The joltage output for the bank is still the number formed by the digits of the batteries you've turned on; the only difference is that now there will be 12 digits in each bank's joltage output instead of two.

Consider again the example from before:

987654321111111
811111111111119
234234234234278
818181911112111
Now, the joltages are much larger:

In 987654321111111, the largest joltage can be found by turning on everything except some 1s at the end to produce 987654321111.
In the digit sequence 811111111111119, the largest joltage can be found by turning on everything except some 1s, producing 811111111119.
In 234234234234278, the largest joltage can be found by turning on everything except a 2 battery, a 3 battery, and another 2 battery near the start to produce 434234234278.
In 818181911112111, the joltage 888911112111 is produced by turning on everything except some 1s near the front.
The total output joltage is now much larger: 987654321111 + 811111111119 + 434234234278 + 888911112111 = 3121910778619.

What is the new total output joltage?

*/

/*
---------------------------------------------------------------------------------------------------------
-----------------------------------------   SOLUTION   -----------------------------------------
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
