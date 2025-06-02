// ! There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.

// * You are giving candies to these children subjected to the following requirements:

// * Each child must have at least one candy.
// * Children with a higher rating get more candies than their neighbors.
// * Return the minimum number of candies you need to have to distribute the candies to the children.

// ? Example 1:
// Input: ratings = [1,0,2]
// Output: 5
// Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.

// ?Example 2:
// Input: ratings = [1,2,2]
// Output: 4
// Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
// The third child gets 1 candy because it satisfies the above two conditions.

// ? Constraints:
// n == ratings.length
// 1 <= n <= 2 * 104
// 0 <= ratings[i] <= 2 * 104

function candy(ratings: number[]): number {
  // Make an array to store candies for each child
  let candies: number[] = new Array(ratings.length).fill(1); // give all the kids a single candy

  // ! LEFT TO RIGHT
  for (let i = 1; i < ratings.length; i++) {
    // if the rating for the last child is lower, give the current child one more than they had
    if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;
  }

  // ! RIGHT TO LEFT
  for (let i = ratings.length - 2; i >= 0; i--) {
    // if the rating for the next child is lower, give the current child one more than they had
    if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], candies[i + 1] + 1);
  }

  // return the total number of candies
  const total = candies.reduce((sum, current) => sum + current, 0);
  return total;
}
