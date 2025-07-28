// ! Given a string s, find the length of the longest substring without duplicate characters.

// ? Example 1:
// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.

// ? Example 2:
// Input: s = "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.

// ? Example 3:
// Input: s = "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3.
// Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
 
// ? Constraints:
// 0 <= s.length <= 5 * 104
// s consists of English letters, digits, symbols and spaces.

function lengthOfLongestSubstring(s: string): number {
    // variable for left and right pointer
    let left = 0;
    let right = 0;
    // variable for answer
    let answer = 0;
    // variable for charSet
    let charSet = new Set();

    // while right pointer is less than the length of the string
    while (right < s.length) {
        // if the charSet does not have the current character
        if (!charSet.has(s[right])) {
            // add the current character to the charSet
            charSet.add(s[right]);
            // increment the right pointer
            right++;
            // update the answer
            answer = Math.max(answer, right - left);
        } else {
            // remove the leftmost character from the charSet
            charSet.delete(s[left]);
            // increment the left pointer
            left++;
        }
    }
    return answer;
}