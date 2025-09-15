// Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2**31, 2**31 - 1], then return 0.

// Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

// Example 1:
// Input: x = 123
// Output: 321

// Example 2:
// Input: x = -123
// Output: -321

// Example 3:
// Input: x = 120
// Output: 21
 
// Constraints:
// -231 <= x <= 231 - 1

function reverse(x: number): number {
    const LOW = -2147483648;
    const HIGH = 2147483647;
    const output = Math.sign(x) * Number(Math.abs(x).toString().split('').reverse().join(''))
    return (output < LOW || output > HIGH) ? 0 : output
};