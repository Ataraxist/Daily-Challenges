// Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:

// 0 <= a, b, c, d < n
// a, b, c, and d are distinct.
// nums[a] + nums[b] + nums[c] + nums[d] == target
// You may return the answer in any order.

// Example 1:

// Input: nums = [1,0,-1,0,-2,2], target = 0
// Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
// Example 2:

// Input: nums = [2,2,2,2,2], target = 8
// Output: [[2,2,2,2]]
 

// Constraints:

// 1 <= nums.length <= 200
// -109 <= nums[i] <= 109
// -109 <= target <= 109

function fourSum(nums: number[], target: number): number[][] {
    // setup
    let output: number[][] = []
    let smallPointer:number  = 0
    let bigPointer:number = 0

    // sort ascending
    nums.sort((a,b) => (a - b))
    
    // fix the first value between index 0 and 4th to last value
    for (let firstFixedIndex = 0; firstFixedIndex < nums.length - 3; firstFixedIndex++){
         // fix the second value between index 1 and 3rd to last value
        for (let secondFixedIndex = firstFixedIndex + 1; secondFixedIndex < nums.length - 2; secondFixedIndex++){
            // make a left and right pointer for remaining numbers (smallest and largest) 
            smallPointer = secondFixedIndex + 1
            bigPointer = nums.length - 1

            // as long as the pointers do not overlap...
            while (smallPointer < bigPointer){
                // if the target is larger than our sum...
                if ((nums[firstFixedIndex] + nums[secondFixedIndex] + nums[smallPointer] + nums[bigPointer]) < target){
                    // make the small pointer bigger
                    smallPointer++
                // if the target is smaller than our sum...
                } else if ((nums[firstFixedIndex] + nums[secondFixedIndex] + nums[smallPointer] + nums[bigPointer]) > target){
                    // make the big pointer smaller
                    bigPointer--
                } else {
                    // match found
                    output.push([nums[firstFixedIndex], nums[secondFixedIndex], nums[smallPointer], nums[bigPointer]])
                    
                    // move pointers
                    smallPointer++
                    bigPointer--

                    // Skip duplicates for smallPointer
                    while (smallPointer < bigPointer && nums[smallPointer] === nums[smallPointer - 1]) {
                        smallPointer++
                    }

                    // Skip duplicates for bigPointer  
                    while (smallPointer < bigPointer && nums[bigPointer] === nums[bigPointer + 1]) {
                        bigPointer--
                    }
                }
            }
            // Skip duplicate values for secondFixedIndex
            while (secondFixedIndex < nums.length - 2 && nums[secondFixedIndex] === nums[secondFixedIndex + 1])
            {
                secondFixedIndex++
            }

        }
        // Skip duplicate values for firstFixedIndex
        while (firstFixedIndex < nums.length - 3 && nums[firstFixedIndex] === nums[firstFixedIndex + 1]) {
            firstFixedIndex++
        }
    }
    return output
};