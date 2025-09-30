// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

// Example 1:
// Input: n = 3
// Output: ["((()))","(()())","(())()","()(())","()()()"]

// Example 2:
// Input: n = 1
// Output: ["()"]
 
// Constraints:
// 1 <= n <= 8

function generateParenthesis(n: number): string[] {
    // We need 2n bits total (n open parens + n close parens)
    const totalBits = 2 * n;
    const result: string[] = [];

    // Maximum binary number we can represent with 2n bits
    // For n=2: (1 << 4) - 1 = 15 (binary: 1111)
    const maxBinaryNum = (1 << totalBits) - 1;

    // ! This would appear to always start with an invalid number, since any number starting with 0 is invalid
    // Start with smallest number that has exactly n ones
    // For n=2: (1 << 2) - 1 = 3 (binary: 0011)
    // This is the lexicographically smallest number with n bits set
    let currentNum = (1 << n) - 1;

    // Iterate through all binary numbers that have exactly n ones
    while (currentNum <= maxBinaryNum) {
        // Track the balance of open vs close parens (should never go negative)
        let openCloseBalance = 0;
        let parenString = '';
        let isValid = true;

        // Read bits from left to right (MSB to LSB)
        // Convert each bit: 1 → '(', 0 → ')'
        for (let bitPosition = totalBits - 1; bitPosition >= 0; bitPosition--) {
            // Extract the bit at this position using right shift and mask
            // Example: For num=12 (1100), at position 3: (12 >> 3) & 1 = 1
            const bit = (currentNum >> bitPosition) & 1;

            // Map bit to parenthesis: 1 is open '(', 0 is close ')'
            parenString += bit ? '(' : ')';

            // Update balance: +1 for open, -1 for close
            openCloseBalance += bit ? 1 : -1;

            // If balance goes negative, we have more closes than opens (invalid!)
            // Example: "))((" would make balance = -1 on first character
            if (openCloseBalance < 0) {
                isValid = false;
                break;
            }
        }

        // Only add valid parentheses combinations to result
        if (isValid) result.push(parenString);

        // Gosper's hack: efficiently generate next number with same number of set bits
        // This skips numbers that don't have exactly n ones, avoiding wasteful iterations

        // Step 1: Find rightmost set bit using two's complement trick
        // Example: num=12 (1100), -num flips bits+1, & isolates rightmost 1
        // 1100 & -1100 = 0100 (isolates the rightmost 1)
        const rightmostOne = currentNum & -currentNum;

        // Step 2: Add the rightmost 1 to flip the rightmost block of 1s
        // Example: 1100 + 0100 = 10000 (carries the 1 to the left)
        const nextHigherOne = currentNum + rightmostOne;

        // Step 3: Redistribute the remaining 1s to the right
        // XOR gets the changed bits, shift and divide normalizes, then OR combines
        // Example: For 1100 → 10010 (next number with two 1s)
        currentNum = (((nextHigherOne ^ currentNum) >> 2) / rightmostOne) | nextHigherOne;

        // Break if we've exceeded the bit range (no more valid numbers)
        if (currentNum > maxBinaryNum) break;
    }

    return result;
};