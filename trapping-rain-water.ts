// ! Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

// ?Example 1:
// Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6
// Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

// ? Example 2:
// Input: height = [4,2,0,3,2,5]
// Output: 9

// ? Constraints:
// n == height.length
// 1 <= n <= 2 * 104
// 0 <= height[i] <= 105

function trap(height: number[]): number {
  // Initialize left pointer starting at the begining
  let left = 0;
  // initialize right pointer starting at the end
  let right = height.length - 1;

  // track the maximum height we have seen from the left and right
  let leftMax = 0;
  let rightMax = 0;

  // track the accumulated total trapped water
  let totalWater = 0;

  // loop until the two pointers meet
  while (left < right) {
    // compare the heights at the 2 pointers
    if (height[left] < height[right]) {
      // This implies leftMax <= rightMax
      // So, water trapped = leftMax - height[left]
      if (height[left] >= leftMax) {
        // update the LEFT max height if it is bigger
        leftMax = height[left];
      } else {
        // otherwise water is trappable, so we add the diff between left max and current height
        totalWater += leftMax - height[left];
      }
      // move the left pointer right by 1
      left++;
    } else {
      // This implies rightMax <= leftMax
      // So, water trapped = rightMax - height[right]
      if (height[right] >= rightMax) {
        // update the RIGHT max height if it is bigger
        rightMax = height[right];
      } else {
        // otherwise water is trappable, so we add the diff between right max and current height
        totalWater += rightMax - height[right];
      }
      // move the right pointer left by 1
      right--;
    }
  }
  return totalWater;
}

