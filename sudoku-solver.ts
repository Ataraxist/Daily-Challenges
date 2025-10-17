// Write a program to solve a Sudoku puzzle by filling the empty cells.

// A sudoku solution must satisfy all of the following rules:

// Each of the digits 1-9 must occur exactly once in each row.
// Each of the digits 1-9 must occur exactly once in each column.
// Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
// The '.' character indicates empty cells.

// Example 1:
// Input: board = [
// ["5","3",".",".","7",".",".",".","."],
// ["6",".",".","1","9","5",".",".","."],
// [".","9","8",".",".",".",".","6","."],
// ["8",".",".",".","6",".",".",".","3"],
// ["4",".",".","8",".","3",".",".","1"],
// ["7",".",".",".","2",".",".",".","6"],
// [".","6",".",".",".",".","2","8","."],
// [".",".",".","4","1","9",".",".","5"],
// [".",".",".",".","8",".",".","7","9"]]

// Output: [
// ["5","3","4","6","7","8","9","1","2"],
// ["6","7","2","1","9","5","3","4","8"],
// ["1","9","8","3","4","2","5","6","7"],
// ["8","5","9","7","6","1","4","2","3"],
// ["4","2","6","8","5","3","7","9","1"],
// ["7","1","3","9","2","4","8","5","6"],
// ["9","6","1","5","3","7","2","8","4"],
// ["2","8","7","4","1","9","6","3","5"],
// ["3","4","5","2","8","6","1","7","9"]]

// Explanation: The input board is shown above and the only valid solution is shown below:

// Constraints:
// board.length == 9
// board[i].length == 9
// board[i][j] is a digit or '.'.
// It is guaranteed that the input board has only one solution.

/**
 Do not return anything, modify board in-place instead.
 */
function solveSudoku(board: string[][]): void {
    // create a meta-board containing 81 arrays to hold 'possible' values for each cell in the board
    // Start with all possibilities (1-9) for each cell
    let metaBoard: string[][][] = 
        Array(9).fill(null).map(
            () => Array(9).fill(null).map(
                () => ['1', '2', '3', '4', '5', '6', '7', '8', '9'])
    );

    // For cells that already have values, keep only that value in metaBoard
    for (let row = 0; row < 9; row++){
        for (let col = 0; col < 9; col ++){
            if (board[row][col] !== "."){
                // Keep only the existing value, removing all other possibilities
                metaBoard[row][col] = [board[row][col]];
            }
        }
    }

    // Main solving loop - keep going while we're making progress
    let changed = true;
    while (changed) {
        changed = false;

        // ! filter the remaining arrays w/ > 1 possibility to their 'possible' legal values
        // for each cell in metaBoard:
        for (let row = 0; row < 9; row++){
            for (let col = 0; col < 9; col ++){
                // if the cell has more than 1 possibility
                if (metaBoard[row][col].length > 1){
                    // ** check all other cells in the same ROW
                    for (let rowCell = 0; rowCell < 9; rowCell++){
                        // if any cell has a single value
                        if (rowCell !== col && metaBoard[row][rowCell].length ===1){
                            // remove that value from current cell's possibilities
                            const valueToDelete = metaBoard[row][rowCell][0]
                            metaBoard[row][col] = metaBoard[row][col].filter(val => val !== valueToDelete)
                        }
                    }
                    // ** check all other cells in the same COLUMN
                    for (let colCell = 0; colCell < 9; colCell++){
                        // if any cell has a single value
                        if (colCell !== row && metaBoard[colCell][col].length ===1){
                            // remove that value from current cell's possibilities
                            const valueToDelete = metaBoard[colCell][col][0]
                            metaBoard[row][col] = metaBoard[row][col].filter(val => val !== valueToDelete)
                        }
                    }
                    // ** check all 9 cells in the same 3x3 BOX
                    const boxStartRow = Math.floor(row / 3) * 3;
                    const boxStartCol = Math.floor(col / 3) * 3

                    for (let boxRow = boxStartRow; boxRow < boxStartRow + 3; boxRow++) {
                        for (let boxCol = boxStartCol; boxCol < boxStartCol + 3; boxCol++) {
                            // if any cell has a single value
                            if ((boxRow !== row || boxCol !== col) && metaBoard[boxRow][boxCol].length === 1) {
                                // remove that value from current cell's possibilities
                                const valueToDelete = metaBoard[boxRow][boxCol][0];
                                metaBoard[row][col] = metaBoard[row][col].filter(val => val !== valueToDelete);
                            }
                        }
                    }
                }
            }
        }

        // Check for naked pairs in rows
        for (let row = 0; row < 9; row++) {
            // Find all cells with exactly 2 possibilities
            const pairs: {col: number, values: number[]}[] = [];
            for (let col = 0; col < 9; col++) {
                if (metaBoard[row][col].length === 2) {
                    pairs.push({col, values: metaBoard[row][col]});
                }
            }

            // Check if any two cells have the same 2 possibilities
            for (let i = 0; i < pairs.length - 1; i++) {
                for (let j = i + 1; j < pairs.length; j++) {
                    // Check if these two cells have identical possibilities
                    if (pairs[i].values[0] === pairs[j].values[0] &&
                        pairs[i].values[1] === pairs[j].values[1]) {
                        // Found a naked pair! Remove these values from other cells in the row
                        const [val1, val2] = pairs[i].values;
                        for (let col = 0; col < 9; col++) {
                            // Skip the pair cells themselves and already solved cells
                            if (col !== pairs[i].col && col !== pairs[j].col && metaBoard[row][col].length > 1) {
                                const before = metaBoard[row][col].length;
                                metaBoard[row][col] = metaBoard[row][col].filter(v => v !== val1 && v !== val2);
                                if (metaBoard[row][col].length < before) {
                                    changed = true;  // We made progress
                                }
                            }
                        }
                    }
                }
            }
        }

        // Check for naked pairs in columns
        for (let col = 0; col < 9; col++) {
            // Find all cells with exactly 2 possibilities
            const pairs: {row: number, values: number[]}[] = [];
            for (let row = 0; row < 9; row++) {
                if (metaBoard[row][col].length === 2) {
                    pairs.push({row, values: metaBoard[row][col]});
                }
            }

            // Check if any two cells have the same 2 possibilities
            for (let i = 0; i < pairs.length - 1; i++) {
                for (let j = i + 1; j < pairs.length; j++) {
                    if (pairs[i].values[0] === pairs[j].values[0] &&
                        pairs[i].values[1] === pairs[j].values[1]) {
                        // Found a naked pair! Remove these values from other cells in the column
                        const [val1, val2] = pairs[i].values;
                        for (let row = 0; row < 9; row++) {
                            if (row !== pairs[i].row && row !== pairs[j].row && metaBoard[row][col].length > 1) {
                                const before = metaBoard[row][col].length;
                                metaBoard[row][col] = metaBoard[row][col].filter(v => v !== val1 && v !== val2);
                                if (metaBoard[row][col].length < before) {
                                    changed = true;
                                }
                            }
                        }
                    }
                }
            }
        }

        // Check for naked pairs in 3x3 boxes
        for (let boxRow = 0; boxRow < 3; boxRow++) {
            for (let boxCol = 0; boxCol < 3; boxCol++) {
                const startRow = boxRow * 3;
                const startCol = boxCol * 3;

                // Find all cells with exactly 2 possibilities in this box
                const pairs: {row: number, col: number, values: number[]}[] = [];
                for (let r = startRow; r < startRow + 3; r++) {
                    for (let c = startCol; c < startCol + 3; c++) {
                        if (metaBoard[r][c].length === 2) {
                            pairs.push({row: r, col: c, values: metaBoard[r][c]});
                        }
                    }
                }

                // Check if any two cells have the same 2 possibilities
                for (let i = 0; i < pairs.length - 1; i++) {
                    for (let j = i + 1; j < pairs.length; j++) {
                        if (pairs[i].values[0] === pairs[j].values[0] &&
                            pairs[i].values[1] === pairs[j].values[1]) {
                            // Found a naked pair! Remove these values from other cells in the box
                            const [val1, val2] = pairs[i].values;
                            for (let r = startRow; r < startRow + 3; r++) {
                                for (let c = startCol; c < startCol + 3; c++) {
                                    if ((r !== pairs[i].row || c !== pairs[i].col) &&
                                        (r !== pairs[j].row || c !== pairs[j].col) &&
                                        metaBoard[r][c].length > 1) {
                                        const before = metaBoard[r][c].length;
                                        metaBoard[r][c] = metaBoard[r][c].filter(v => v !== val1 && v !== val2);
                                        if (metaBoard[r][c].length < before) {
                                            changed = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // after filtering, check if any cells now have only one possible value
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                // if so, update the board with that value
                if (board[row][col] === '.' && metaBoard[row][col].length === 1) {
                    // Found a cell with only one possibility - place it on the board
                    board[row][col] = metaBoard[row][col][0].toString();
                    changed = true;  // We made progress, so continue the loop
                }
            }
        }
    }

    // Debug: Show remaining possibilities for unsolved cells
    console.log("\nRemaining possibilities for unsolved cells:");
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === '.') {
                console.log(`Cell [${row},${col}]: ${metaBoard[row][col].join(',')}`);
            }
        }
    }
};

// Test case
const testBoard = [
    [".",".","9","7","4","8",".",".","."],
    ["7",".",".",".",".",".",".",".","."],
    [".","2",".","1",".","9",".",".","."],
    [".",".","7",".",".",".","2","4","."],
    [".","6","4",".","1",".","5","9","."],
    [".","9","8",".",".",".","3",".","."],
    [".",".",".","8",".","3",".","2","."],
    [".",".",".",".",".",".",".",".","6"],
    [".",".",".","2","7","5","9",".","."]
];

console.log("Initial board:");
console.table(testBoard);

solveSudoku(testBoard);

console.log("\nFinal board:");
console.table(testBoard);

// Check how many cells were solved
let solvedCount = 0;
for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
        if (testBoard[row][col] !== ".") {
            solvedCount++;
        }
    }
}
console.log(`\nSolved ${solvedCount} out of 81 cells`);