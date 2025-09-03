// You are given a 2D array points of size n x 2 representing integer coordinates of some points on a 2D plane, where points[i] = [xi, yi].

// Count the number of pairs of points (A, B), where

// A is on the upper left side of B, and
// there are no other points in the rectangle (or line) they make (including the border).
// Return the count.

 

// Example 1:
// Input: points = [[1,1],[2,2],[3,3]]
// Output: 0
// Explanation:



// There is no way to choose A and B so A is on the upper left side of B.

// Example 2:

// Input: points = [[6,2],[4,4],[2,6]]

// Output: 2

// Explanation:



// The left one is the pair (points[1], points[0]), where points[1] is on the upper left side of points[0] and the rectangle is empty.
// The middle one is the pair (points[2], points[1]), same as the left one it is a valid pair.
// The right one is the pair (points[2], points[0]), where points[2] is on the upper left side of points[0], but points[1] is inside the rectangle so it's not a valid pair.
// Example 3:

// Input: points = [[3,1],[1,3],[1,1]]

// Output: 2

// Explanation:



// The left one is the pair (points[2], points[0]), where points[2] is on the upper left side of points[0] and there are no other points on the line they form. Note that it is a valid state when the two points form a line.
// The middle one is the pair (points[1], points[2]), it is a valid pair same as the left one.
// The right one is the pair (points[1], points[0]), it is not a valid pair as points[2] is on the border of the rectangle.
 

// Constraints:

// 2 <= n <= 50
// points[i].length == 2
// 0 <= points[i][0], points[i][1] <= 50
// All points[i] are distinct.

function numberOfPairs(points: number[][]): number {
    // sort the points by X coordinate (left to right), subsort by Y coordinate descending (top to bottom).
    points.sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0]; // sort by X ascending (smaller X first)
        return b[1] - a[1]; // sort by Y descending (larger Y first)
    });
    
    let count = 0;
    const n = points.length;
    
    // check every combination of two points
    // firstPair = "upper-left" point, secondPair = "lower-right" point
    for (let firstPair = 0; firstPair < n; firstPair++) {
        // start from i+1 because I cant compare a point with itself
        for (let secondPair = firstPair + 1; secondPair < n; secondPair++) {
            // make it readable
            const [firstX, firstY] = points[firstPair]; // should be upper-left
            const [secondX, secondY] = points[secondPair]; // should be lower-right
            
            // check if firstPair is upper left of secondPair where "Upper-left" means firstPair.x <= secondPair.x AND firstPair.y >= secondPair.y

            // ! Possible valid cases:
            // ? Diagonal rectangle: x1 < x2 AND y1 > y2
            // ? Horizontal line: x1 < x2 AND y1 = y2
            // ? Vertical line: x1 = x2 AND y1 > y2

            if (firstX <= secondX && firstY >= secondY && (firstX < secondX || firstY > secondY)) {
                // assume the rectangle is valid until we find a point inside it
                let valid = true;
                
                // check all other points to see if any are inside or on the border
                for (let thirdPair = 0; thirdPair < n; thirdPair++) {
                    // skip the two points that form the rectangle corners
                    if (thirdPair === firstPair || thirdPair === secondPair) continue;
                    
                    // Get the coordinates of the point we're checking
                    const [thirdX, thirdY] = points[thirdPair];
                    
                    // ! Possible invalid cases:
                    // ? X coordinate is between x1 and x2
                    // ? Y coordinate is between y2 and y1

                    if (firstX <= thirdX && thirdX <= secondX && secondY <= thirdY && thirdY <= firstY) {
                        valid = false; // invalidate the pair
                        break; // break immediatly, no need to check anything else
                    }
                }

                // increment our count if valid is still true after checks
                if (valid) count++;
            }
        }
    }
    return count;
};