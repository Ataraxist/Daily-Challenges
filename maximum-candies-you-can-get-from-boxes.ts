// ! You have n boxes labeled from 0 to n - 1. You are given four arrays: status, candies, keys, and containedBoxes where:

// * status[i] is 1 if the ith box is open and 0 if the ith box is closed,
// * candies[i] is the number of candies in the ith box,
// * keys[i] is a list of the labels of the boxes you can open after opening the ith box.
// * containedBoxes[i] is a list of the boxes you found inside the ith box.
// * You are given an integer array initialBoxes that contains the labels of the boxes you initially have. You can take all the candies in any open box and you can use the keys in it to open new boxes and you also can use the boxes you find in it.

// Return the maximum number of candies you can get following the rules above.

 

// ? Example 1:
// Input: status = [1,0,1,0], candies = [7,5,4,100], keys = [[],[],[1],[]], containedBoxes = [[1,2],[3],[],[]], initialBoxes = [0]
// Output: 16
// Explanation: You will be initially given box 0. You will find 7 candies in it and boxes 1 and 2.
// Box 1 is closed and you do not have a key for it so you will open box 2. You will find 4 candies and a key to box 1 in box 2.
// In box 1, you will find 5 candies and box 3 but you will not find a key to box 3 so box 3 will remain closed.
// Total number of candies collected = 7 + 4 + 5 = 16 candy.

// ? Example 2:
// Input: status = [1,0,0,0,0,0], candies = [1,1,1,1,1,1], keys = [[1,2,3,4,5],[],[],[],[],[]], containedBoxes = [[1,2,3,4,5],[],[],[],[],[]], initialBoxes = [0]
// Output: 6
// Explanation: You have initially box 0. Opening it you can find boxes 1,2,3,4 and 5 and their keys.
// The total number of candies will be 6.
 

// ? Constraints:
// n == status.length == candies.length == keys.length == containedBoxes.length
// 1 <= n <= 1000
// status[i] is either 0 or 1.
// 1 <= candies[i] <= 1000
// 0 <= keys[i].length <= n
// 0 <= keys[i][j] < n
// All values of keys[i] are unique.
// 0 <= containedBoxes[i].length <= n
// 0 <= containedBoxes[i][j] < n
// All values of containedBoxes[i] are unique.
// Each box is contained in one box at most.
// 0 <= initialBoxes.length <= n
// 0 <= initialBoxes[i] < n

function maxCandies(status: number[], candies: number[], keys: number[][], containedBoxes: number[][], initialBoxes: number[]): number {
  // Use Breadth First Search (BFS) to traverse all possible boxes you can open. Only push to the queue the boxes the you have with their keys.
  // Use a set to store the boxes that you have already visited.

  // Initialize a queue to store the boxes that can be opened
  const queue: number[] = [];
  // Initialize a set to store the boxes that you have already visited
  const visited: Set<number> = new Set();

  // Initialize a variable to store the total number of candies collected
  let totalCandies = 0;
  

  // Add the initial boxes to the queue
  for (const box of initialBoxes) {
    queue.push(box);
  }

  // While the queue is not empty, process the boxes
  while (queue.length > 0) {
    // Get the next box from the queue
    const currentBox = queue.shift();

    // If the box is not visited, add it to the visited set
    if (!visited.has(currentBox)) {
      visited.add(currentBox);
    }

    // If the box is open, add the candies to the total number of candies collected
    if (status[currentBox] === 1) {
  }
};