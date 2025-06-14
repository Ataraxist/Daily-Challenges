// Given an NxN matrix with unique integers : Find and print positions
// of all numbers such that it is the biggest in its row and also the
// smallest in its column . e.g. : In 3 x 3 with elements
// 1 2 3
// 4 5 6
// 7 8 9
// the number is 3 and position (1,3)*/

function doStuff(matrix: number[][]) {
  // 1. Find the max in each row
  // 2. Find the min in each column
  // 3. Find the intersection of the two
  // 4. Return the intersection

  const max = matrix.map((row) => Math.max(...row));
  const min = matrix.map((row) => Math.min(...row));

  const result: { row: number; col: number }[] = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === max[i] && matrix[i][j] === min[j]) {
        result.push({ row: i, col: j });
      }
    }
  }

  return result;
}

// Test cases
const matrix1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const matrix2 = [
  [1, 9, 2],
  [4, 9, 5],
  [7, 9, 6],
];
;

console.log('Test Case 1:', doStuff(matrix1)); // Should output { positions: [[1, 3]], runtime: "X.XXXms" }
console.log('Test Case 2:', doStuff(matrix2)); //