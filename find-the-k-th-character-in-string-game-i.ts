// ! Alice and Bob are playing a game. Initially, Alice has a string word = "a".

// * You are given a positive integer k.

// * Now Bob will ask Alice to perform the following operation forever:

// * Generate a new string by changing each character in word to its next character in the English alphabet, and append it to the original word.
// * For example, performing the operation on "c" generates "cd" and performing the operation on "zb" generates "zbac".

// * Return the value of the kth character in word, after enough operations have been done for word to have at least k characters.

// * Note that the character 'z' can be changed to 'a' in the operation.

 

// ? Example 1:
// Input: k = 5
// Output: "b"
// Explanation:
// Initially, word = "a". We need to do the operation three times:
// Generated string is "b", word becomes "ab".
// Generated string is "bc", word becomes "abbc".
// Generated string is "bccd", word becomes "abbcbccd".

// ? Example 2:
// Input: k = 10
// Output: "c"

// Constraints:
// 1 <= k <= 500

function buildLookup() {
    // Create an array to store the lookup table for k = 1 to 500 (1-based indexing)
    const lookup: string[] = [];
    // 'length' will track the current total length of the string at each stage
    let length = 1;
    // 'nextLength' is the next power of 2 threshold at which the string length doubles
    let nextLength = 2;

    // Iterate over each k from 1 to 500 to determine the k-th character in the final string
    for (let k = 1; k <= 500; k++) {
        // If k reaches the next power of 2, update 'length' and 'nextLength' accordingly
        if (k >= nextLength) {
            length = nextLength;      // Move to the next power of 2
            nextLength *= 2;          // Set the next threshold
        }

        // 'shift' counts how many times we move into the second half of the string during tracing
        // Each time we do, the character is incremented by 1 (modulo 26 for alphabet wraparound)
        let shift = 0;
        // 'l' is a working variable for the current length as we trace back through the recursive structure
        let l = length;
        // 'pos' is our current position as we trace back to the original character (1-based)
        let pos = k;

        // Trace back through the recursive structure of the string:
        // At each stage, the string is [previous][previous+1], so:
        // - If 'pos' is in the first half, it maps directly to the previous string
        // - If 'pos' is in the second half, it maps to the (pos - half)th character of the previous string, incremented by 1
        // We repeat this process until we reach the base case (length == 1)
        while (l > 1) {
            if (pos > l / 2) {
                // If our position is in the second half, move to the mirrored position in the first half
                pos -= l / 2;
                // Each time we do this, the character is incremented by 1 (wraps around after 'z')
                shift++;
            }
            // Move to the previous stage (half the length)
            l /= 2;
        }
        // The original character is always 'a' (char code 97), so apply the total shift modulo 26
        // This gives us the correct character for the k-th position
        lookup[k] = String.fromCharCode(97 + (shift % 26));
    }
    // Usage: lookup[k] gives the answer for k (1-based)
}

function kthCharacterHard(k: number): string {
    const lookup = 'abbcbccdbccdcddebccdcddecddedeefbccdcddecddedeefcddedeefdeefeffgbccdcddecddedeefcddedeefdeefeffgcddedeefdeefeffgdeefeffgeffgfgghbccdcddecddedeefcddedeefdeefeffgcddedeefdeefeffgdeefeffgeffgfgghcddedeefdeefeffgdeefeffgeffgfgghdeefeffgeffgfggheffgfgghfgghghhibccdcddecddedeefcddedeefdeefeffgcddedeefdeefeffgdeefeffgeffgfgghcddedeefdeefeffgdeefeffgeffgfgghdeefeffgeffgfggheffgfgghfgghghhicddedeefdeefeffgdeefeffgeffgfgghdeefeffgeffgfggheffgfgghfgghghhideefeffgeffgfggheffgfgghfgghghhieffgfgghfgghghhifggh'
    return lookup[k - 1];
};