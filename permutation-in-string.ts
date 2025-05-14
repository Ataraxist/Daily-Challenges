// ! Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.

// * In other words, return true if one of s1's permutations is the substring of s2.

// ? Example 1:

// Input: s1 = "ab", s2 = "eidbaooo"
// Output: true
// Explanation: s2 contains one permutation of s1 ("ba").

// ? Example 2:

// Input: s1 = "ab", s2 = "eidboaoo"
// Output: false

// * Constraints:

// 1 <= s1.length, s2.length <= 104
// s1 and s2 consist of lowercase English letters.

function checkInclusion(s1: string, s2: string): boolean {
  let s1Map = new Map<string, number>();
  let s2WindowMap = new Map<string, number>();

  // Build frequency map for s1
  for (let i = 0; i < s1.length; i++) {
    s1Map.set(s1[i], (s1Map.get(s1[i]) || 0) + 1);
    // this sets the freq map for s2 for the first N characters of s2 where N is the length of s1
    s2WindowMap.set(s2[i], (s2WindowMap.get(s2[i]) || 0) + 1);
  }

  // Helper to compare two maps
  function mapcheck(map1: Map<string, number>, map2: Map<string, number>): boolean {
    if (map1.size !== map2.size) return false;
    for (let [key, val] of map1) {
      if (map2.get(key) !== val) return false;
    }
    return true;
  };

  // compare the maps
  if (mapcheck(s1Map, s2WindowMap)) return true;

  // Slide the window through s2
  for (let i = s1.length; i < s2.length; i++) {
    const startChar = s2[i - s1.length];
    const endChar = s2[i];

    // Remove startChar from the window
    s2WindowMap.set(startChar, s2WindowMap.get(startChar)! - 1);
    if (s2WindowMap.get(startChar) === 0) {
      s2WindowMap.delete(startChar);
    }

    // Add endChar to the window
    s2WindowMap.set(endChar, (s2WindowMap.get(endChar) || 0) + 1);

    // Compare again
    if (mapcheck(s1Map, s2WindowMap)) return true;
  }

  return false;
}

// create an array of evey combination of s1
// create a map of the s1 combinations
// slide a window across s2 and use map.includes(s1) to return true


// function checkInclusion(s1: string, s2: string): boolean {
//   if (s1.length > s2.length) return false;

//   const counts = Array.from({ length: 26 }, () => 0);
//   const base = 'a'.charCodeAt(0);

//   for (let i = 0; i < s1.length; ++i) {
//       counts[s1.charCodeAt(i) - base]++;
//       counts[s2.charCodeAt(i) - base]--;
//   }

//   if (counts.every(count => count === 0)) return true;

//   for (let i = s1.length; i < s2.length; i++) {
//       counts[s2.charCodeAt(i) - base]--;
//       counts[s2.charCodeAt(i - s1.length) - base]++;
//       if (counts.every(count => count === 0)) return true;
//   }
  
//   return false;
// }