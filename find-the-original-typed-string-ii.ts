// ! Alice is attempting to type a specific string on her computer. However, she tends to be clumsy and may press a key for too long, resulting in a character being typed multiple times.
// * You are given a string word, which represents the final output displayed on Alice's screen. You are also given a positive integer k.
// * Return the total number of possible original strings that Alice might have intended to type, if she was trying to type a string of size at least k.
// * Since the answer may be very large, return it modulo 10^9 + 7.

// ? Example 1:
// Input: word = "aabbccdd", k = 7
// Output: 5
// Explanation:
// The possible strings are: "aabbccdd", "aabbccd", "aabbcdd", "aabccdd", and "abbccdd".

// ? Example 2:
// Input: word = "aabbccdd", k = 8
// Output: 1
// Explanation:
// The only possible string is "aabbccdd".

// ? Example 3:
// Input: word = "aaabbb", k = 3
// Output: 8

// ? Constraints:
// 1 <= word.length <= 5 * 105
// word consists only of lowercase English letters.
// 1 <= k <= 2000

function possibleStringCount(word: string, k: number): number {
    // Modulo value for large numbers
    const MOD = 1_000_000_007;
    // Array to store (len - 1) for each group of consecutive characters
    const cnt: number[] = [];
    // 'total' will hold the product of all group lengths (all possible ways)
    let total = 1;
    const n = word.length;
    let i = 0;
    // Group consecutive identical characters and calculate total ways
    while (i < n) {
        let j = i;
        // Find the end of the current group
        while (i < n && word[i] === word[j]) {
            i++;
        }
        const len = i - j;
        if (len > 0) {
            // For each group, we can keep 1 to len characters, so (len) choices
            // For DP, we store (len - 1) because we must keep at least 1
            cnt.push(len - 1);
            // Multiply total by len (number of choices for this group)
            total = total * len % MOD;
        }
        // Each group must contribute at least 1 character, so reduce k
        k--;
    }
    // If k <= 0, every possible combination is valid (no need to remove any)
    if (k <= 0)
        return total;
    // DP array: dp[i] = number of ways to get total length i (i < k)
    // Only need to track up to k-1, since we subtract these from total
    const dp: number[] = new Array(k).fill(0);
    dp[0] = 1; // One way to have length 0 (before any group)
    // For each group, update the DP array
    for (const c of cnt) {
        // First, compute prefix sums for sliding window
        for (let i = 1; i < k; i++) {
            dp[i] = (dp[i] + dp[i - 1]) % MOD;
        }
        // Now, subtract out-of-window values to maintain only valid sums
        for (let i = k - 1; i > c; i--) {
            // Remove ways that use more than (c + 1) from this group
            dp[i] = (dp[i] - dp[i - c - 1] + MOD) % MOD;
        }
    }
    // Final prefix sum to get the number of ways for each length < k
    for (let i = 1; i < k; i++) {
        dp[i] = (dp[i] + dp[i - 1]) % MOD;
    }
    // The answer is total ways minus the number of ways with length < k
    // (i.e., only keep those with length >= k)
    const ans = (total - dp[k - 1] + MOD) % MOD;
    return ans;
}