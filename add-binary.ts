// Given two binary strings a and b, return their sum as a binary string.

// Example 1:
// Input: a = "11", b = "1"
// Output: "100"

// Example 2:
// Input: a = "1010", b = "1011"
// Output: "10101"

// Constraints:
// 1 <= a.length, b.length <= 104
// a and b consist only of '0' or '1' characters.
// Each string does not contain leading zeros except for the zero itself.

function addBinary(a: string, b: string): string {
    return (BigInt('0b' + a) + BigInt('0b' + b)).toString(2);
};

// Manual bit-by-bit implementation for reference
function addBinaryManual(a: string, b: string): string {
    let result = '';
    let carry = 0;
    let i = a.length - 1;
    let j = b.length - 1;

    while (i >= 0 || j >= 0 || carry) {
        const bitA = i >= 0 ? parseInt(a[i]) : 0;
        const bitB = j >= 0 ? parseInt(b[j]) : 0;

        const sum = bitA + bitB + carry;
        result = (sum & 1) + result;
        carry = sum >> 1;

        i--;
        j--;
    }

    return result;
};