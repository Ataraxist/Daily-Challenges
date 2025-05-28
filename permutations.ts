// ! Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

// ? Example 1:
// Input: nums = [1,2,3]
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// ? Example 2:
// Input: nums = [0,1]
// Output: [[0,1],[1,0]]

// ? Example 3:
// Input: nums = [1]
// Output: [[1]]

// ? Constraints:
// 1 <= nums.length <= 6
// -10 <= nums[i] <= 10
// All the integers of nums are unique.

function permute(nums: number[]): number[][] {
    // result array
    const result: number[][] = [];
    // recursive function to generate permutations
    const generatePermutations = (current: number[], remaining: number[]) => {
        // if no remaining numbers, add the current permutation to the result
        if (remaining.length === 0) {
            result.push(current);
            return;
        }
        // loop through the remaining numbers
        for (let i = 0; i < remaining.length; i++) {
            // create a new current permutation
            const newCurrent = [...current, remaining[i]];
            // create a new remaining array
            const newRemaining = remaining.filter((_, index) => index !== i);
            // call the recursive function with the new current and remaining arrays
            generatePermutations(newCurrent, newRemaining);
        }
    }
    // call the recursive function with the initial current and remaining arrays
    generatePermutations([], nums);
    // return the result
    return result;
}; 
