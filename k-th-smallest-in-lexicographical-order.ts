// ! Given two integers n and k, return the kth lexicographically smallest integer in the range [1, n].

// ? Example 1:
// Input: n = 13, k = 2
// Output: 10
// Explanation: The lexicographical order is [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9], so the second smallest number is 10.

// ? Example 2:
// Input: n = 1, k = 1
// Output: 1

// ? Constraints:
// 1 <= k <= n <= 10^9

function findKthNumber(n: number, k: number): number {
  // start with 1 because it's always the first number in lexicographical order
  let result = 1;

  // k represents how many more steps we need to take to reach our target, but its off by 1
  k--;

  // iterate until weve found the k-th number
  while (k > 0) {
    // calculate how many numbers are in the range that are <= n. This tells us how many numbers start with our current prefix.
    let count = 0;

    // start of current level (if result = 8, start = 8)
    let start = result;

    // start of next level (if result = 8, end = 9)
    let end = result + 1;

    // iterate through all possible digit lengths for numbers starting with our prefix
    // for example, if result = 8, we check 8, 80-89, 800-899, 8000-8999, ...
    while (start <= n) {
      // count how many numbers are in the current range <= n while Math.min(n + 1, end) makes sure we don't count numbers beyond n
      count += Math.min(n + 1, end) - start;

      // Move to next digit length: 8 -> 80, 80 -> 800, 800 -> 8000, ...
      start *= 10;
      end *= 10;
    }

    // Now we have two choices
    if (k >= count) {
      // the k-th number is NOT in the subtree starting with 'result'
      // This means we need to move to the next number at the same level
      // ? for example: if result = 8 and k is large enough, move to result = 9
      result++;

      // subtract the count of numbers we just skipped
      k -= count;
    } else {
      // the k-th number IS in the subtree starting with 'result'
      // this means we need to go deeper into this subtree
      // for example: if result = 8 and k is small, move to result = 80
      // add a zero to go one level deeper
      result *= 10;

      // move one step closer to the target
      k--;
    }
  }

  // When k reaches 0, we've found our target number
  return result;
}
