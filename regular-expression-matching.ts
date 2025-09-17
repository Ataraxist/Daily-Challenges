// Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:

// '.' Matches any single character.​​​​
// '*' Matches zero or more of the preceding element.
// The matching should cover the entire input string (not partial).

// Example 1:
// Input: s = "aa", p = "a"
// Output: false
// Explanation: "a" does not match the entire string "aa".

// Example 2:
// Input: s = "aa", p = "a*"
// Output: true
// Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".

// Example 3:
// Input: s = "ab", p = ".*"
// Output: true
// Explanation: ".*" means "zero or more (*) of any character (.)".


// Constraints:
// 1 <= s.length <= 20
// 1 <= p.length <= 20
// s contains only lowercase English letters.
// p contains only lowercase English letters, '.', and '*'.
// It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.

function isMatch(s: string, p: string, textIndex: number = 0, patternIndex: number = 0): boolean {

    // if we've run out of pattern characters... 
    if (patternIndex >= p.length) {
        // ...check if text is also gone
        return textIndex >= s.length;
    }

    // check if current positions match 
    const currentCharsMatch = 
        // make sure we arent checking outside of the string
        textIndex < s.length && 
        // check for exact match
        (s[textIndex] === p[patternIndex] || 
            // OR check if the pattern index is a wildcard
            p[patternIndex] === '.');

    // ! STAR IS NEXT
    if (patternIndex + 1 < p.length && p[patternIndex + 1] === '*') {

        // Option 1: ignore the 'char + *' combo and advance to next pattern index
        const ignore = isMatch(s, p, textIndex, patternIndex + 2);

        // Option 2: use the 'char + *' combo and stay with the same pattern 
        const use = currentCharsMatch && isMatch(s, p, textIndex + 1, patternIndex);

        // return true if either option works
        return ignore || use;

        // ! NO STAR NEXT
    } else {
        // both must match and advance together
        return currentCharsMatch && isMatch(s, p, textIndex + 1, patternIndex + 1);
    }
};