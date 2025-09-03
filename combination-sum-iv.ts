// Given an array of distinct integers nums and a target integer target, return the number of possible combinations that add up to target.

// The test cases are generated so that the answer can fit in a 32-bit integer.

// Example 1:
// Input: nums = [1,2,3], target = 4
// Output: 7
// Explanation:
// The possible combination ways are:
// (1, 1, 1, 1)
// (1, 1, 2)
// (1, 2, 1)
// (1, 3)
// (2, 1, 1)
// (2, 2)
// (3, 1)
// Note that different sequences are counted as different combinations.

// Example 2:
// Input: nums = [9], target = 3
// Output: 0
 
// Constraints:
// 1 <= nums.length <= 200
// 1 <= nums[i] <= 1000
// All the elements of nums are unique.
// 1 <= target <= 1000
 
// Follow up: What if negative numbers are allowed in the given array? How does it change the problem? What limitation we need to add to the question to allow negative numbers?

function combinationSum4(nums: number[], target: number): number {
    // Make the dynamic programming array with empty slots from 0 to target
    const bullshitArray: number[] = new Array(target + 1).fill(0);

    // Filling the first slot (because arthur said so)
    bullshitArray[0] = 1; 
    
    // For each value from 1 to target...
    for (let i = 1; i <= target; i++) {
        // ...try each number in nums
        for (const num of nums) {
            // Check if this number is usable.
            if (i >= num) {
                // If so, add the number of ways to make (i - num)
                bullshitArray[i] += bullshitArray[i - num];
            }
        }
    }
    
    return bullshitArray[target];
}