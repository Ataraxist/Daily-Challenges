// ! Given an integer array nums, return the maximum difference between two successive elements in its sorted form. If the array contains less than two elements, return 0.

// * You must write an algorithm that runs in linear time and uses linear extra space.

// ? Example 1:
// Input: nums = [3,6,9,1]
// Output: 3
// Explanation: The sorted form of the array is [1,3,6,9], either (3,6) or (6,9) has the maximum difference 3.

// ? Example 2:
// Input: nums = [10]
// Output: 0
// Explanation: The array contains less than 2 elements, therefore return 0.

// ? Constraints:
// 1 <= nums.length <= 105
// 0 <= nums[i] <= 109

function maximumGap(nums: number[]): number {
    if (nums.length < 2) return 0;
    
    // Find min and max values
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    
    // If all elements are the same, max gap is 0
    if (min === max) return 0;
    
    const n = nums.length;
    const bucketSize = Math.max(1, Math.floor((max - min) / (n - 1)));
    const bucketCount = Math.floor((max - min) / bucketSize) + 1;
    
    // Initialize buckets
    const buckets: { min: number; max: number }[] = [];
    for (let i = 0; i < bucketCount; i++) {
        buckets.push({ min: Infinity, max: -Infinity });
    }
    
    // Distribute numbers into buckets
    for (const num of nums) {
        const bucketIndex = Math.floor((num - min) / bucketSize);
        buckets[bucketIndex].min = Math.min(buckets[bucketIndex].min, num);
        buckets[bucketIndex].max = Math.max(buckets[bucketIndex].max, num);
    }
    
    // Find maximum gap between buckets
    let maxGap = 0;
    let prevMax = buckets[0].max;
    
    for (let i = 1; i < bucketCount; i++) {
        if (buckets[i].min !== Infinity) {
            maxGap = Math.max(maxGap, buckets[i].min - prevMax);
            prevMax = buckets[i].max;
        }
    }
    return maxGap;
};