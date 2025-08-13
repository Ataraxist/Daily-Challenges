// Given an integer numRows, return the first numRows of Pascal's triangle.

// In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:

// Example 1:
// Input: numRows = 5
// Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

// Example 2:
// Input: numRows = 1
// Output: [[1]]
 

// Constraints:

// 1 <= numRows <= 30

function generate(numRows: number): number[][] {
    // use memoization to store results
    const cache: number[][] = [];
    cache[0] = [1];

    // use recursion to check the cache
    function generateRow(rowIndex: number): number[] {
        // Check if already calculated
        if (cache[rowIndex]) {
            return cache[rowIndex];
        }
        
        // Base case: first row is always [1]
        if (rowIndex === 0) return cache[0];
        
        // !!!<<<RECURSE>>>!!!
        const prevRow = generateRow(rowIndex - 1);
        const currentRow: number[] = [];
        
        // First element is always 1
        currentRow.push(1);
        
        // the value in the sub array = index-1 + index
        for (let i = 1; i < rowIndex; i++) {
            currentRow.push(prevRow[i - 1] + prevRow[i]);
        }
        
        // Last element is always 1
        currentRow.push(1);
        
        // Store in cache
        cache[rowIndex] = currentRow;
        return currentRow;
    }
    
    // Generate all rows up to numRows
    for (let i = 0; i < numRows; i++) {
        generateRow(i);
    }
    
    // return an array containing the cache contents
    return cache
};