// ! Given an array of strings strs, group the anagrams together. You can return the answer in any order.

// ? Example 1:
// Input: strs = ["eat","tea","tan","ate","nat","bat"]
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

// * Explanation:

// There is no string in strs that can be rearranged to form "bat".
// The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
// The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.

// ? Example 2:
// Input: strs = [""]
// Output: [[""]]

// ? Example 3:
// Input: strs = ["a"]
// Output: [["a"]]

// Constraints:
// 1 <= strs.length <= 104
// 0 <= strs[i].length <= 100
// strs[i] consists of lowercase English letters.

function groupAnagrams(strs: string[]): string[][] {
  // make an empty array to hold the final groups
  const groups: string[][] = [];
  // make a copy of the input list that I can remove items from
  const remainingWords: string[] = [...strs];
  // loop through the remaining words as long as there are words left to check=
  while (remainingWords.length > 0) {
    // take the first word
    let current = remainingWords[0];
    // make an empty array to hold the group
    const group: string[] = [current];
    // make a frequency map for the current word
    const currentMap = new Map();
    // put letters into it
    for (let i = 0; i < current.length; i++) {
      // assign the key to the letter, and the value to the count
      currentMap.set(current[i], (currentMap.get(current[i]) || 0) + 1);
    }
    // remove the current word from the remaining words
    remainingWords.splice(0, 1);
    // compare this words to every other word left in remaining words
    for (let i = remainingWords.length - 1; i >= 0; i--) {
      // name our candidate word
      const candidate: string = remainingWords[i];
      // if the current words and the candidate word are not the same length, early exit
      if (current.length !== candidate.length) continue;
      // make a frequency map for the candidate word
      const candidateMap = new Map();
      // put letters into it
      for (let j = 0; j < candidate.length; j++) {
        // assign the key to the letter, and the value to the count
        candidateMap.set(
          candidate[j],
          (candidateMap.get(candidate[j]) || 0) + 1
        );
      }
      // make a boolean to track if its a match
      let isMatch = true;
      // check if the 2 frequency maps are identical
      for (let [key, value] of currentMap.entries()) {
        // if the key from the current map does not exist, or if the values are not the same, break early
        if (candidateMap.get(key) !== value) {
          isMatch = false;
          break;
        }
      }
      // make sure the candidate map doesnt have extra keys
      if (isMatch && candidateMap.size !== currentMap.size) {
        isMatch = false;
      }

      if (isMatch) {
        // add candidate to the group
        group.push(candidate);
        // remove the candidate from the remaining words
        remainingWords.splice(i, 1);
      }
    }
    groups.push(group);
  }
  // return the groups array
  return groups;
}

// function groupAnagrams(strs: string[]): string[][] {
//   // loop through each element in strs and save into object
//   let compare: { [key: string]: string[] } = {};
//   for (let str of strs) {
//     // sort each element in the array
//     const sort = str.split('').sort().join('');
//     // if sorted string does not exist
//     if (!compare[sort]) {
//       // set a empty array to be the value
//       compare[sort] = [];
//     }
//     // add current string into the value
//     compare[sort].push(str);
//   }
//   // get the values in the object
//   return Object.values(compare);
// }
