// ! Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

// * Notice that the solution set must not contain duplicate triplets.

// ? Example 1:
// Input: nums = [-1,0,1,2,-1,-4]
// Output: [[-1,-1,2],[-1,0,1]]
// Explanation: 
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
// The distinct triplets are [-1,0,1] and [-1,-1,2].
// Notice that the order of the output and the order of the triplets does not matter.

// ? Example 2:
// Input: nums = [0,1,1]
// Output: []
// Explanation: The only possible triplet does not sum up to 0.

// ? Example 3:
// Input: nums = [0,0,0]
// Output: [[0,0,0]]
// Explanation: The only possible triplet sums up to 0.

// ? Constraints:
// 3 <= nums.length <= 3000
// -105 <= nums[i] <= 105

function threeSum(nums: number[]): number[][] {
    // Initialize result array to store all valid triplets
    const result: number[][] = [];
    
    // Sort the array in ascending order
    const sortedNumbers = nums.sort((a, b) => a - b);

    // Iterate through the array
    for (let i = 0; i < sortedNumbers.length - 2; i++) {
        // skip duplicates
        if (i > 0 && sortedNumbers[i] === sortedNumbers[i - 1]) continue;
        
        // Initialize two pointers: left starts right after current element, right starts at the end
        let left = i + 1;
        let right = sortedNumbers.length - 1;
        
        // Continue while left and right pointers haven't met
        while (left < right) {
            // Calculate the sum of current triplet: first element + left pointer + right pointer
            const sum = sortedNumbers[i] + sortedNumbers[left] + sortedNumbers[right];
            
            // If we find a valid triplet 
            if (sum === 0) {
                // Add it to our results
                result.push([sortedNumbers[i], sortedNumbers[left], sortedNumbers[right]]);
                
                // Move left pointer forward until we find a different value
                while (left < right && sortedNumbers[left] === sortedNumbers[left + 1]) left++;
                
                // Move right pointer backward until we find a different value
                while (left < right && sortedNumbers[right] === sortedNumbers[right - 1]) right--;
                
                // Move both pointers inward to continue searching for more triplets
                left++;
                right--;
            } else if (sum < 0) {
                // Sum is too small, need a larger value
                left++;
            } else {
                // Sum is too large, need a smaller value
                right--;
            }
        }
    }
    
    // Return all unique triplets that sum to zero
    return result;
}