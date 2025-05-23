// ! The DNA sequence is composed of a series of nucleotides abbreviated as 'A', 'C', 'G', and 'T'.

// For example, "ACGAATTCCG" is a DNA sequence.
// When studying DNA, it is useful to identify repeated sequences within the DNA.

// * Given a string s that represents a DNA sequence, return all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in any order.

// ? Example 1:
// Input: s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
// Output: ["AAAAACCCCC","CCCCCAAAAA"]

// ? Example 2:
// Input: s = "AAAAAAAAAAAAA"
// Output: ["AAAAAAAAAA"]

// Constraints:
// 1 <= s.length <= 105
// s[i] is either 'A', 'C', 'G', or 'T'.

function findRepeatedDnaSequences(s: string): string[] {
  // Create a set to store the sequences we have seen
  const seen: Set<string> = new Set();
  // Create a set to store the sequences that are repeated
  const repeated: Set<string> = new Set();

  // Loop through the string and add the sequences to the sets
  for (let i = 0; i < s.length - 9; i++) {
    // Create a sequence from thbe next 10 char
    const sequence = s.slice(i, i + 10);
    // If the sequence is already in the set, add it to the repeated set
    if (seen.has(sequence)) {
      repeated.add(sequence);
    } else {
      // If the sequence is not in the set, add it to the seen set
      seen.add(sequence);
    }
  }
  // Return the repeated sequences as an array
  return Array.from(repeated);
}
