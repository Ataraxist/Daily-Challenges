// ! You are given two strings of the same length s1 and s2 and a string baseStr.

// * We say s1[i] and s2[i] are equivalent characters.
// * For example, if s1 = "abc" and s2 = "cde", then we have 'a' == 'c', 'b' == 'd', and 'c' == 'e'.

// * Equivalent characters follow the usual rules of any equivalence relation:
// * Reflexivity: 'a' == 'a'.
// * Symmetry: 'a' == 'b' implies 'b' == 'a'.
// * Transitivity: 'a' == 'b' and 'b' == 'c' implies 'a' == 'c'.
// ? For example, given the equivalency information from s1 = "abc" and s2 = "cde", "acd" and "aab" are equivalent strings of baseStr = "eed", and "aab" is the lexicographically smallest equivalent string of baseStr.

// ! Return the lexicographically smallest equivalent string of baseStr by using the equivalency information from s1 and s2.

// ? Example 1:
// Input: s1 = "parker", s2 = "morris", baseStr = "parser"
// Output: "makkek"
// Explanation: Based on the equivalency information in s1 and s2, we can group their characters as [m,p], [a,o], [k,r,s], [e,i].
// The characters in each group are equivalent and sorted in lexicographical order.
// So the answer is "makkek".

// ? Example 2:
// Input: s1 = "hello", s2 = "world", baseStr = "hold"
// Output: "hdld"
// Explanation: Based on the equivalency information in s1 and s2, we can group their characters as [h,w], [d,e,o], [l,r].
// So only the second letter 'o' in baseStr is changed to 'd', the answer is "hdld".

// ? Example 3:
// Input: s1 = "leetcode", s2 = "programs", baseStr = "sourcecode"
// Output: "aauaaaaada"
// Explanation: We group the equivalent characters in s1 and s2 as [a,o,e,r,s,c], [l,p], [g,t] and [d,m], thus all letters in baseStr except 'u' and 'd' are transformed to 'a', the answer is "aauaaaaada".

// ? Constraints:
// 1 <= s1.length, s2.length, baseStr <= 1000
// s1.length == s2.length
// s1, s2, and baseStr consist of lowercase English letters.

function smallestEquivalentString(
  s1: string,
  s2: string,
  baseStr: string
): string {
  // create a map to store character groups
  const characterGroups: Map<string, Set<string>> = new Map();
  
  // Declare a helper to find the smallest character in a group
  function findSmallestCharacter(char: string): string {
    // if the character is not in the map, add it to the map
    if (!characterGroups.has(char)) {
      characterGroups.set(char, new Set([char]));
      return char;
    }
    // return the smallest character in the group
    return Array.from(characterGroups.get(char)!).sort()[0];
  }
  
  // ! GPT
  // Declare a helper to merge two character groups
  function mergeGroups(char1: string, char2: string) {
    // get the group for the first character
    const group1 = characterGroups.get(char1) || new Set([char1]);
    // get the group for the second character
    const group2 = characterGroups.get(char2) || new Set([char2]);
    // merge the two groups
    const merged = new Set([...group1, ...group2]);
    
    // Update all characters in the merged group
    for (const char of merged) {
      characterGroups.set(char, merged);
    }
  }
  
  // do the stuff for all character pairs from s1 and s2
  for (let i = 0; i < s1.length; i++) {
    mergeGroups(s1[i], s2[i]);
  }
  // ! END GPT
  
  // build the result string 
  let result = "";
  for (let j = 0; j < baseStr.length; j++) {
    // using the smallest equivalent character for each character in baseStr
    result += findSmallestCharacter(baseStr[j]);
  }
  return result
}

