// Given a string s consisting of words and spaces, return the length of the last word in the string.

// A word is a maximal substring consisting of non-space characters only.

// Example 1:
// Input: s = "Hello World"
// Output: 5
// Explanation: The last word is "World" with length 5.

// Example 2:
// Input: s = "   fly me   to   the moon  "
// Output: 4
// Explanation: The last word is "moon" with length 4.

// Example 3:
// Input: s = "luffy is still joyboy"
// Output: 6
// Explanation: The last word is "joyboy" with length 6.
 
// Constraints:
// 1 <= s.length <= 104
// s consists of only English letters and spaces ' '.
// There will be at least one word in s.

function lengthOfLastWord(s: string): number {
    if (s.length === 1) return 1
    let right:number = s.length -1
    let left:number = 0
    
    // move right inwards until we hit a character
    while (/[a-zA-Z]/.test(s[right]) === false) {
        right--
    }

    // set left pointer = right - 1
    if (s.length > 1) left = right - 1

    // move left pointer to the left until first space
    while (left >= 0 && /[a-zA-Z]/.test(s[left]) === true){
        left--
    }
    // get diff between indicies
    return (right - left)
};