// ! Given an integer x, return true if x is a palindrome, and false otherwise.

// ? Example 1:
// Input: x = 121
// Output: true
// Explanation: 121 reads as 121 from left to right and from right to left.

// ? Example 2:
// Input: x = -121
// Output: false
// Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.

// ? Example 3:
// Input: x = 10
// Output: false
// Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

// ? Constraints:
// -2^31 <= x <= 2^31 - 1

// ? Follow up: Could you solve it without converting the integer to a string?

function isPalindrome(x: number): boolean {
  // if negative, return false
  if (x < 0) return false;
  // convert the number to a string
  const str = x.toString();
  // reverse the string
  const reversed = str.split('').reverse().join('');
  // compare the original string with the reversed string
  return str === reversed;
}

function isPalindromeWithoutMakingItAString(x: number): boolean {
  // if negative, return false
  if (x < 0) return false;
  // take the original number and reverse it without making it a string
  let reversed = 0;
  let original = x;
  while (original > 0) {
    reversed = reversed * 10 + (original % 10);
    original = Math.floor(original / 10 );
  }
  return reversed === x;
}
