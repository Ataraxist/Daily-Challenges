// ! Given an integer n, return all the structurally unique BST's (binary search trees), which has exactly n nodes of unique values from 1 to n. Return the answer in any order.

// ? Example 1:
// Input: n = 3
// Output: [[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]

// ? Example 2:
// Input: n = 1
// Output: [[1]]

// Constraints:
// 1 <= n <= 8

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
// ! Dont submit this to leetcode, as this is duplicate code in their testbench
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// Generate all structurally unique BSTs that store values from 1 to n
// The result is returned as an array of root nodes
function generateTrees(n: number): Array<TreeNode | null> {
  // If n is less than 1, abort early, however, this is irellevant as Constraints: 1 <= n <= 8
  if (n < 1) return [];

  // Build trees using numbers from 1 to n.
  return buildTrees(1, n);

  // This function returns all unique BSTs that can be constructed using values from 1 (start) to n (end)
  function buildTrees(start: number, end: number): Array<TreeNode | null> {
    // Placeholder array of nodes
    const allTrees: Array<TreeNode | null> = [];

    // Base case: if the range is invalid (start > end), there's no number to place in a node
    if (start > end) {
      // so return a list with a single null.
      allTrees.push(null);
      // this allows the parent recursion step to treat it as an empty subtree
      return allTrees;
    }

    // Loop through each number in the current range as a potential root value.
    // The idea is: for each number i, generate all valid left subtrees using values less than i,
    // and all valid right subtrees using values greater than i
    for (let i = start; i <= end; i++) {
      // Recursively generate all valid left subtrees using values from start to i - 1.
      const leftTrees = buildTrees(start, i - 1);

      // Recursively generate all valid right subtrees using values from i + 1 to end.
      const rightTrees = buildTrees(i + 1, end);

      // Combine each pair of left and right subtrees with the current value i as the root.
      for (const left of leftTrees) {
        for (const right of rightTrees) {
          // Create a new root node with value i
          const root = new TreeNode(i);

          // Assign the generated left and right subtrees to the newly created root
          root.left = left;
          root.right = right;

          // Push to the results array
          allTrees.push(root);
        }
      }
    }

    // Return all trees
    return allTrees;
  }
}
