// Given two positive integers n and x.

// Return the number of ways n can be expressed as the sum of the xth power of unique positive integers, in other words, the number of sets of unique integers [n1, n2, ..., nk] where n = n1x + n2x + ... + nkx.

// Since the result can be very large, return it modulo 109 + 7.

// For example, if n = 160 and x = 3, one way to express n is n = 23 + 33 + 53.

 

// Example 1:

// Input: n = 10, x = 2
// Output: 1
// Explanation: We can express n as the following: n = 32 + 12 = 10.
// It can be shown that it is the only way to express 10 as the sum of the 2nd power of unique integers.
// Example 2:

// Input: n = 4, x = 1
// Output: 2
// Explanation: We can express n in the following ways:
// - n = 41 = 4.
// - n = 31 + 11 = 4.
 

// Constraints:

// 1 <= n <= 300
// 1 <= x <= 5

function numberOfWays(n: number, x: number): number {
    const MOD = 1e9 + 7;
    
    // dp[i] = number of ways to express i as sum of x-th powers
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1; // one way to express 0 (using no numbers)
    
    // Try each base number starting from 1
    let base = 1;
    while (Math.pow(base, x) <= n) {
        const power = Math.pow(base, x);
        
        // Update dp array backwards to avoid using same number twice
        for (let i = n; i >= power; i--) {
            dp[i] = (dp[i] + dp[i - power]) % MOD;
        }
        
        base++;
    }
    
    return dp[n];
};