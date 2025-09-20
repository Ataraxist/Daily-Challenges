// Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.

// Return the sum of the three integers.

// You may assume that each input would have exactly one solution.

// Example 1:
// Input: nums = [-1,2,1,-4], target = 1
// Output: 2
// Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

// Example 2:
// Input: nums = [0,0,0], target = 1
// Output: 0
// Explanation: The sum that is closest to the target is 0. (0 + 0 + 0 = 0).

// Constraints:

// 3 <= nums.length <= 500
// -1000 <= nums[i] <= 1000
// -104 <= target <= 104

function threeSumClosest(nums: number[], target: number): number {
    // Setup
    nums.sort((a,b) => a - b)
    let currentSum:number = 0
    let closestSum:number = nums[0] + nums[1] + nums[2]
    
    for (let fixed = 0; fixed < nums.length -2; fixed++) {
        let small:number = fixed + 1
        let big:number = nums.length - 1
        while (small < big){
            // get current sum
            currentSum = nums[fixed] + nums[small] + nums[big]

            // check if current is closer than existing closest
            if (Math.abs(currentSum - target) < Math.abs(closestSum - target)){
                closestSum = currentSum
            }

            // update pointers
            if (currentSum < target){
                small ++
            } else if (currentSum > target){
                big --
            } else {
                return target
            }
        }
    }
    return closestSum
};