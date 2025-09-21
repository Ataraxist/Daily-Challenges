// Given an integer rowIndex, return the rowIndexth (0-indexed) row of the Pascal's triangle.

// In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:

// Example 1:
// Input: rowIndex = 3
// Output: [1,3,3,1]

// Example 2:
// Input: rowIndex = 0
// Output: [1]

// Example 3:
// Input: rowIndex = 1
// Output: [1,1]
 
// Constraints:
// 0 <= rowIndex <= 33

// Bottom-up approach
function getRow(rowIndex: number): number[] {
    const dp:number[][] = new Array(rowIndex + 1)
    dp[0] = [1]

    for (let i = 1; i <= rowIndex; i++){
        dp[i] = new Array(i + 1)
        for (let j = 0; j < i + 1; j++){
            dp[i][j] = (dp[i - 1][j - 1] ?? 0) + (dp[i - 1][j] ?? 0)
        }
    }

    return dp[rowIndex]
};
