// Given the integers zero, one, low, and high, we can construct a string by starting with an empty string, and then at each step perform either of the following:

// Append the character '0' zero times.
// Append the character '1' one times.
// This can be performed any number of times.

// A good string is a string constructed by the above process having a length between low and high (inclusive).

// Return the number of different good strings that can be constructed satisfying these properties. Since the answer can be large, return it modulo 109 + 7.

 

// Example 1:

// Input: low = 3, high = 3, zero = 1, one = 1
// Output: 8
// Explanation: 
// One possible valid good string is "011". 
// It can be constructed as follows: "" -> "0" -> "01" -> "011". 
// All binary strings from "000" to "111" are good strings in this example.
// Example 2:

// Input: low = 2, high = 3, zero = 1, one = 2
// Output: 5
// Explanation: The good strings are "00", "11", "000", "110", and "011".
 

// Constraints:

// 1 <= low <= high <= 105
// 1 <= zero, one <= low

function countGoodStrings(low: number, high: number, zero: number, one: number): number {
    const modBullshit = 1000000007
    let result = 0;

    // Array to track; how many different ways can I build a string of length i?
    const outputArray: number[] = new Array(high + 1).fill(0);
    
    // only 1 way to have an empty string
    outputArray[0] = 1;
    
    // iterate from 1 to high
    for (let i = 1; i <= high; i++) {
        // Can i reach length i by adding 'zero' zeros to a previous string?
        if (i >= zero) {
            // if yes, all the ways to make length (i-zero) can be extended to make length i
            outputArray[i] = (outputArray[i] + outputArray[i - zero]) % modBullshit;
        }
        
        // Can I reach length i by adding 'one' ones to a previous string?  
        if (i >= one) {
            // if yes, all the ways to make length (i-one) can be extended to make length i
            outputArray[i] = (outputArray[i] + outputArray[i - one]) % modBullshit;
        }
    }
    
    // now add up all the ways for each valid length
    for (let i = low; i <= high; i++) {
        result = (result + outputArray[i]) % modBullshit;
    }
    
    return result;
}
