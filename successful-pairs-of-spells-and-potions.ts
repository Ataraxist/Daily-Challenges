// You are given two positive integer arrays spells and potions, of length n and m respectively, where spells[i] represents the strength of the ith spell and potions[j] represents the strength of the jth potion.

// You are also given an integer success. A spell and potion pair is considered successful if the product of their strengths is at least success.

// Return an integer array pairs of length n where pairs[i] is the number of potions that will form a successful pair with the ith spell.

 

// Example 1:

// Input: spells = [5,1,3], potions = [1,2,3,4,5], success = 7
// Output: [4,0,3]
// Explanation:
// - 0th spell: 5 * [1,2,3,4,5] = [5,10,15,20,25]. 4 pairs are successful.
// - 1st spell: 1 * [1,2,3,4,5] = [1,2,3,4,5]. 0 pairs are successful.
// - 2nd spell: 3 * [1,2,3,4,5] = [3,6,9,12,15]. 3 pairs are successful.
// Thus, [4,0,3] is returned.
// Example 2:

// Input: spells = [3,1,2], potions = [8,5,8], success = 16
// Output: [2,0,2]
// Explanation:
// - 0th spell: 3 * [8,5,8] = [24,15,24]. 2 pairs are successful.
// - 1st spell: 1 * [8,5,8] = [8,5,8]. 0 pairs are successful. 
// - 2nd spell: 2 * [8,5,8] = [16,10,16]. 2 pairs are successful. 
// Thus, [2,0,2] is returned.
 

// Constraints:

// n == spells.length
// m == potions.length
// 1 <= n, m <= 105
// 1 <= spells[i], potions[i] <= 105
// 1 <= success <= 1010

function successfulPairs(spells: number[], potions: number[], success: number): number[] {
    // STEP 1: Find the maximum potion strength to determine the size of our counting array
    // This will be used to create a frequency/counting array
    const maxp = Math.max(...potions);
    
    // STEP 2: Create a counting array initialized with zeros
    // dp[i] will eventually represent "how many potions have strength >= i"
    // Size is maxp + 1 to accommodate potion strengths from 0 to maxp
    const dp = new Array(maxp + 1).fill(0);
    
    // STEP 3: Count the frequency of each potion strength
    // For each potion strength p, increment dp[p] to count how many potions have that strength
    // Example: if potions = [1,2,3,4,5], then dp[1]=1, dp[2]=1, dp[3]=1, dp[4]=1, dp[5]=1
    for (const p of potions) {
        dp[p]++;
    }
    
    // STEP 4: Build cumulative counts (suffix sum) from right to left
    // Transform dp[i] from "count of potions with strength = i" to "count of potions with strength >= i"
    // We go backwards because we want to accumulate counts for higher strengths
    // After this loop: dp[i] = number of potions with strength >= i
    for (let i = maxp - 1; i >= 0; i--) {
        dp[i] += dp[i + 1]; // Add count from next higher strength to current
    }
    
    // STEP 5: For each spell, calculate how many potions can form successful pairs
    for (let j = 0; j < spells.length; j++) {
        // Calculate the minimum potion strength needed for this spell to be successful
        // If spell_strength * potion_strength >= success, then potion_strength >= success / spell_strength
        // We use Math.ceil because we need the potion strength to be at least this value
        // Example: if success=7 and spell=5, then need = ceil(7/5) = 2
        const need = Math.ceil(success / spells[j]);
        
        // Look up how many potions have strength >= the required minimum
        // If the required strength is within our potion range, use dp[need]
        // If the required strength exceeds our maximum potion strength, no potions can work (return 0)
        spells[j] = need <= maxp ? dp[need]: 0;
    }
    
    // Return the modified spells array where each element represents the count of successful pairs
    return spells
};