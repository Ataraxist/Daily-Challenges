// Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

// Example 1:
// Input: haystack = "sadbutsad", needle = "sad"
// Output: 0
// Explanation: "sad" occurs at index 0 and 6.
// The first occurrence is at index 0, so we return 0.

// Example 2:
// Input: haystack = "leetcode", needle = "leeto"
// Output: -1
// Explanation: "leeto" did not occur in "leetcode", so we return -1.
 
// Constraints:
// 1 <= haystack.length, needle.length <= 104
// haystack and needle consist of only lowercase English characters.

function strStr(haystack: string, needle: string): number {
    const needleMap = new Map<string, number>()
    const needleLength = needle.length
    for (let i = 0; i <= haystack.length - needleLength; i++){
        needleMap.set(haystack.substring(i, i + needleLength), i)
        if (needleMap.has(needle)) return needleMap.get(needle)!
    }
    return -1
};