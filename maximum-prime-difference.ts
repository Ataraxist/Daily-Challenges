// ! You are given an integer array nums.
// * Return an integer that is the maximum distance between the indices of two (not necessarily different) prime numbers in nums.

// ? Example 1:
// Input: nums = [4,2,9,5,3]
// Output: 3
// Explanation: nums[1], nums[3], and nums[4] are prime. So the answer is |4 - 1| = 3.

// ?Example 2:
// Input: nums = [4,8,2,8]
// Output: 0
// Explanation: nums[2] is prime. Because there is just one prime number, the answer is |2 - 2| = 0.

// Constraints:

// 1 <= nums.length <= 3 * 105
// 1 <= nums[i] <= 100
// The input is generated such that the number of prime numbers in the nums is at least one.

// Identify whether a number is prime or not
// Identify the indicies of the prime numbers
// Identify the first prime number and the last prime number in the list

function maximumPrimeDifference(nums: number[]): number {
  // Helper to see if it is prime
  function isPrime(num: number): boolean {
    // If the number is negative or 1, return false
    if (num < 2) return false;
    // Check up to num/2 times for each number
    for (let i = 2; i * i <= num; i++) {
      // To see if it is divisible
      if (num % i === 0) return false;
    }
    // If it is not divisble by anything, return true
    return true;
  }

  // Placeholders for first and last primes
  let first: number | null = null;
  let last: number = 0;

  // Itterate through the input array
  for (let i = 0; i < nums.length; i++){
    // Check each one to see if it is a prime
    if (isPrime(nums[i])){
      // Set the index of the first one found to the first pointer
      if (first === null){
        first = i
      }
      // Set the index of the second one found (or any subsequent) to the last pointer
      last = i
    }
  }
  
  return last - first!; // We are guaranteed atleast 2, so this will never be null
}


// function maximumPrimeDifference(nums: number[]): number {

//   const N = nums.length;
//   const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97])

//   let leftP = -1;
//   for (let i = 0; i < N; i++) {
//     if (primes.has(nums[i])) {
//       leftP = i;
//       break;
//     }
//   }

//   if (leftP === -1) return 0;

//   let rightP = -1;
//   for (let i = N - 1; 0 <= i; i--) {
//     if (primes.has(nums[i])) {
//       rightP = i;
//       break;
//     }
//   }
//   const diff = rightP - leftP;
    
//   return diff;
// };