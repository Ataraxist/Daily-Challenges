// Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

// Each row must contain the digits 1-9 without repetition.
// Each column must contain the digits 1-9 without repetition.
// Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
// Note:

// A Sudoku board (partially filled) could be valid but is not necessarily solvable.
// Only the filled cells need to be validated according to the mentioned rules.
 

// Example 1:


// Input: board = 
// [["5","3",".",".","7",".",".",".","."]
// ,["6",".",".","1","9","5",".",".","."]
// ,[".","9","8",".",".",".",".","6","."]
// ,["8",".",".",".","6",".",".",".","3"]
// ,["4",".",".","8",".","3",".",".","1"]
// ,["7",".",".",".","2",".",".",".","6"]
// ,[".","6",".",".",".",".","2","8","."]
// ,[".",".",".","4","1","9",".",".","5"]
// ,[".",".",".",".","8",".",".","7","9"]]
// Output: true
// Example 2:

// Input: board = 
// [["8","3",".",".","7",".",".",".","."]
// ,["6",".",".","1","9","5",".",".","."]
// ,[".","9","8",".",".",".",".","6","."]
// ,["8",".",".",".","6",".",".",".","3"]
// ,["4",".",".","8",".","3",".",".","1"]
// ,["7",".",".",".","2",".",".",".","6"]
// ,[".","6",".",".",".",".","2","8","."]
// ,[".",".",".","4","1","9",".",".","5"]
// ,[".",".",".",".","8",".",".","7","9"]]
// Output: false
// Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
 

// Constraints:

// board.length == 9
// board[i].length == 9
// board[i][j] is a digit 1-9 or '.'.

function isValidSudoku(board: string[][]): boolean {
    // create a temporary set for each row
    for (let row = 0; row < 9; row++){
        const rowSet = new Set<string>()
        
        for (let col = 0; col < 9; col++){
            const value = board[row][col]
            
            if (value === '.') continue
            
            // if we attempt to add a duplicate to any set, return false
            if (rowSet.has(value)) return false

            rowSet.add(value)
        }
    } 

    // create a temporary set for each column
    for (let col = 0; col < 9; col++){
        const colSet = new Set<string>()

        for (let row = 0; row < 9; row++){
            const value = board[row][col]

            if (value === '.') continue

            // if we attempt to add a duplicate to any set, return false
            if (colSet.has(value)) return false

            colSet.add(value)
        }
    }

    // create a temporary set for each 3x3 sub-box
    for (let boxRow = 0; boxRow < 3; boxRow++) {
        for (let boxCol = 0; boxCol < 3; boxCol++) {
            const boxSet = new Set<string>()

            // iterate through each cell in the 3x3 sub-box
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const row = boxRow * 3 + i
                    const col = boxCol * 3 + j
                    const value = board[row][col]

                    if (value === '.') continue

                    // if we attempt to add a duplicate to any set, return false
                    if (boxSet.has(value)) return false

                    boxSet.add(value)
                }
            }
        }
    }

    return true
};

function isValidSudokuAlt(board: string[][]): boolean {
    const seen = new Set<string>()

    for (let row = 0; row < 9; row++){
        for (let col = 0; col < 9; col++){
            const value = board[row][col]

            if (value === '.') continue

            const rowTuple = `(r,${row},${value})`
            const colTuple = `(c,${col},${value})`
            const boxTuple = `(b,${Math.floor(row/3)},${Math.floor(col/3)},${value})`

            if (seen.has(rowTuple) || seen.has(colTuple) || seen.has(boxTuple)) {
                return false
            }

            seen.add(rowTuple)
            seen.add(colTuple)
            seen.add(boxTuple)
        }
    }

    return true
}

function isValidSudokuArrays(board: string[][]): boolean {
    const rows = Array.from({length: 9}, () => new Set<string>())
    const cols = Array.from({length: 9}, () => new Set<string>())
    const boxes = Array.from({length: 9}, () => new Set<string>())

    for (let row = 0; row < 9; row++){
        for (let col = 0; col < 9; col++){
            const value = board[row][col]

            if (value === '.') continue

            const boxIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3)

            if (rows[row].has(value) || cols[col].has(value) || boxes[boxIndex].has(value)) return false

            rows[row].add(value)
            cols[col].add(value)
            boxes[boxIndex].add(value)
        }
    }

    return true
}