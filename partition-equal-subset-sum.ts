// Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.

// Example 1:
// Input: nums = [1,5,11,5]
// Output: true
// Explanation: The array can be partitioned as [1, 5, 5] and [11].

// Example 2:
// Input: nums = [1,2,3,5]
// Output: false
// Explanation: The array cannot be partitioned into equal sum subsets.
 
// Constraints:
// 1 <= nums.length <= 200
// 1 <= nums[i] <= 100

function canPartition(nums: number[]): boolean {
    // get target
    const arraySum = nums.reduce((a, b) => a + b, 0);
    if (arraySum % 2 !== 0) return false; // skip if target is odd
    const target = arraySum / 2;

    // setup dp array
    const dp: boolean[] = new Array(target + 1).fill(false);
    dp[0] = true;

    for (const num of nums) {
        for (let sum = target; sum >= num; sum--) { // top down
            dp[sum] = dp[sum] || dp[sum - num];
        }
    }
    return dp[target];
};

