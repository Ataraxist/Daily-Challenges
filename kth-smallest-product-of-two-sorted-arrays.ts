// ! Given two sorted 0-indexed integer arrays nums1 and nums2 as well as an integer k, return the kth (1-based) smallest product of nums1[i] * nums2[j] where 0 <= i < nums1.length and 0 <= j < nums2.length.
 
// ? Example 1:
// Input: nums1 = [2,5], nums2 = [3,4], k = 2
// Output: 8
// Explanation: The 2 smallest products are:
// - nums1[0] * nums2[0] = 2 * 3 = 6
// - nums1[0] * nums2[1] = 2 * 4 = 8
// The 2nd smallest product is 8.

// ? Example 2:
// Input: nums1 = [-4,-2,0,3], nums2 = [2,4], k = 6
// Output: 0
// Explanation: The 6 smallest products are:
// - nums1[0] * nums2[1] = (-4) * 4 = -16
// - nums1[0] * nums2[0] = (-4) * 2 = -8
// - nums1[1] * nums2[1] = (-2) * 4 = -8
// - nums1[1] * nums2[0] = (-2) * 2 = -4
// - nums1[2] * nums2[0] = 0 * 2 = 0
// - nums1[2] * nums2[1] = 0 * 4 = 0
// The 6th smallest product is 0.

// ? Example 3:
// Input: nums1 = [-2,-1,0,1,2], nums2 = [-3,-1,2,4,5], k = 3
// Output: -6
// Explanation: The 3 smallest products are:
// - nums1[0] * nums2[4] = (-2) * 5 = -10
// - nums1[0] * nums2[3] = (-2) * 4 = -8
// - nums1[4] * nums2[0] = 2 * (-3) = -6
// The 3rd smallest product is -6.
 
// ? Constraints:
// 1 <= nums1.length, nums2.length <= 5 * 10^4
// -105 <= nums1[i], nums2[j] <= 105
// 1 <= k <= nums1.length * nums2.length
// nums1 and nums2 are sorted.

function kthSmallestProduct(nums1: number[], nums2: number[], k: number): number {
    const length1 = nums1.length;
    const length2 = nums2.length;
  
    // Helper function:
    // Counts how many pairs (i, j) have nums1[i] * nums2[j] <= maxProduct
    function countPairsLessThanOrEqualTo(maxProduct: number): number {
      let pairCount = 0;
  
      for (let index1 = 0; index1 < length1; index1++) {
        const value1 = nums1[index1];
  
        if (value1 === 0) {
          // Zero times anything is 0
          // If maxProduct is >= 0, then all products are <= maxProduct
          if (maxProduct >= 0) pairCount += length2;
          // Else, 0 * anything is too big (since it's 0 > negative maxProduct)
        } else if (value1 > 0) {
          // We want to count how many elements in nums2 satisfy:
          // value1 * nums2[j] <= maxProduct
          // Since value1 > 0, we divide both sides safely:
          // nums2[j] <= maxProduct / value1
          let low = 0;
          let high = length2 - 1;
          let lastValidIndex = -1;
  
          while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (value1 * nums2[mid] <= maxProduct) {
              lastValidIndex = mid;
              low = mid + 1; // Try to go further right
            } else {
              high = mid - 1;
            }
          }
  
          // lastValidIndex + 1 elements satisfy the condition
          pairCount += lastValidIndex + 1;
        } else {
          // value1 < 0
          // We want value1 * nums2[j] <= maxProduct
          // Since value1 is negative, dividing flips inequality:
          // nums2[j] >= maxProduct / value1
          // We're looking for the first index j where this is true
  
          let low = 0;
          let high = length2 - 1;
          let firstValidIndex = length2;
  
          while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (value1 * nums2[mid] <= maxProduct) {
              firstValidIndex = mid;
              high = mid - 1; // Try to go further left
            } else {
              low = mid + 1;
            }
          }
  
          // From firstValidIndex to end of nums2 are valid
          pairCount += (length2 - firstValidIndex);
        }
      }
  
      return pairCount;
    }
  
    // We search over the range of all possible products
    // Lower bound: smallest negative product (-1e10)
    // Upper bound: largest positive product (+1e10)
    let searchLow = -1e10;
    let searchHigh = 1e10;
  
    while (searchLow < searchHigh) {
      const midProduct = Math.floor((searchLow + searchHigh) / 2);
  
      const pairsUpToMid = countPairsLessThanOrEqualTo(midProduct);
  
      if (pairsUpToMid >= k) {
        // Too many or just enough pairs ≤ midProduct — try smaller value
        searchHigh = midProduct;
      } else {
        // Not enough — we need to look at bigger products
        searchLow = midProduct + 1;
      }
    }
  
    // At this point, searchLow is the smallest product
    // such that there are at least k pairs ≤ it
    return searchLow;
  }
  