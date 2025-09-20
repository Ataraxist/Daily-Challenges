// Write a function to find the longest common prefix string amongst an array of strings.
// If there is no common prefix, return an empty string "".

// Example 1:
// Input: strs = ["flower","flow","flight"]
// Output: "fl"

// Example 2:
// Input: strs = ["dog","racecar","car"]
// Output: ""
// Explanation: There is no common prefix among the input strings.

// Constraints:
// 1 <= strs.length <= 200
// 0 <= strs[i].length <= 200
// strs[i] consists of only lowercase English letters if it is non-empty.

function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return '';

    for (let i = 0; i < strs[0].length; i++){
        const char = strs[0][i];

        for (let j = 1; j < strs.length; j++){
            if (i >= strs[j].length || strs[j][i] !== char){
                return strs[0].substring(0,i);
            }
        }
    }
    return strs[0]
};

function longestCommonPrefixRecursive(strs: string[]): string {
    if (strs.length === 0) return '';
    if (strs.length === 1) return strs[0];

    function checkPrefix(index: number): string {
        // Base case: if index exceeds the length of the first string
        if (index >= strs[0].length) {
            return strs[0].substring(0, index);
        }

        // Get the character at current index from first string
        const charToCheck = strs[0][index];

        // Check if all strings have this character at the same position
        for (let i = 1; i < strs.length; i++) {
            // If any string is shorter than current index or character doesn't match
            if (index >= strs[i].length || strs[i][index] !== charToCheck) {
                return strs[0].substring(0, index);
            }
        }

        // All strings match at this index, recursively check next index
        return checkPrefix(index + 1);
    }

    return checkPrefix(0);
};