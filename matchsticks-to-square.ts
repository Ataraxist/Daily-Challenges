// ! You are given an integer array matchsticks where matchsticks[i] is the length of the ith matchstick. You want to use all the matchsticks to make one square. You should not break any stick, but you can link them up, and each matchstick must be used exactly one time.

// Return true if you can make this square and false otherwise.

// ? Example 1:
// Input: matchsticks = [1,1,2,2,2]
// Output: true
// Explanation: You can form a square with length 2, one side of the square came two sticks with length 1.

// ? Example 2:
// Input: matchsticks = [3,3,3,3,4]
// Output: false
// Explanation: You cannot find a way to form a square with all the matchsticks.

// * Constraints:

// 1 <= matchsticks.length <= 15
// 1 <= matchsticks[i] <= 10^8

function makesquare(matchsticks: number[]): boolean {
  // Get the total length of the of the match sticks
  const totalLength = matchsticks.reduce((a, b) => a + b, 0);
  // Check if you can make a square out of it
  if (totalLength % 4 !== 0) return false;
  // Get the length of a single side
  const sideLength = totalLength / 4;
  // Make an empty array with the 4 sides
  const sides = Array(4).fill(0);
  // Sort the matchsticks in descending order
  matchsticks.sort((a, b) => b - a);
  // Use a dfs function to check if you can make a square
  function depthFirstSearch(index: number): boolean {
    // If you have used all the matchsticks, check if you can make a square
    if (index === matchsticks.length) {
      // Check if all the sides are equal
      return (
        // If all the sides are equal, return true
        sides[0] === sides[1] && sides[1] === sides[2] && sides[2] === sides[3]
      );
    }
    // Loop through the 4 sides
    for (let i = 0; i < 4; i++) {
      // If the side length is greater than the side length, skip it
      if (sides[i] + matchsticks[index] > sideLength) continue;
      // Add the matchstick to the side
      sides[i] += matchsticks[index];
      // Recursively call the dfs function
      if (depthFirstSearch(index + 1)) return true;
      // Backtrack
      sides[i] -= matchsticks[index];
    }
    // If you cannot make a square, return false
    return false;
  }
  // Return the result of the dfs function
  return depthFirstSearch(0);
}
