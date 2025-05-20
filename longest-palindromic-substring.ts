// ! Given a string s, return the longest palindromic substring in s.

// ? Example 1:
// Input: s = "babad"
// Output: "bab"
// Explanation: "aba" is also a valid answer.

// ? Example 2:
// Input: s = "cbbd"
// Output: "bb"

// Constraints:

// 1 <= s.length <= 1000
// s consist of only digits and English letters.

function longestPalindrome(s: string): string {
  // Abort early if there is only 1 letter
  if (s.length <= 1) return s;

  // placeholder start and end values of the longbest palindrome
  let start: number = 0;
  let end: number = 0;

  // helper function to check if a string is a palindrome
  function isPalindrome(left: number, right: number): void {
    // set a while loop tgo iterate through the string, expanding until we no longer have a match
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      // check the next pair of characters
      left--;
      right++;
    }

    // This code only runs once we have expanded too far by 1 on both sides
    const length = right - left - 1;
    // only update the start and end if the length is larger than whatever it current is
    if (length > end - start) {
      start = left + 1;
      end = right - 1;
    }
  }

  for (let i = 0; i < s.length; i++) {
    // for odd
    isPalindrome(i, i);
    // for even
    isPalindrome(i, i + 1);
  }

  return s.substring(start, end + 1);
}
