// ! Given the root of a binary tree, return the average value of the nodes on each level in the form of an array. Answers within 10-5 of the actual answer will be accepted.

// ? Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: [3.00000,14.50000,11.00000]
// Explanation: The average value of nodes on level 0 is 3, on level 1 is 14.5, and on level 2 is 11.
// Hence return [3, 14.5, 11].

// ? Example 2:
// Input: root = [3,9,20,15,7]
// Output: [3.00000,14.50000,11.00000]

// ? Constraints:
// The number of nodes in the tree is in the range [1, 104].
// -231 <= Node.val <= 231 - 1

// Definition for a binary tree node.
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

function averageOfLevels(root: TreeNode | null): number[] {
  if (!root) return [];

  const result: number[] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const numberOfNodes = queue.length;
    let sumOfNodes = 0;function averageOfLevels(root: TreeNode | null): number[] {
      if (!root) return [];
    
      const result: number[] = [];
      const queue: TreeNode[] = [root];
    
      while (queue.length > 0) {
        const numberOfNodes = queue.length;
        let sumOfNodes = 0;
    
        for (let i = 0; i < numberOfNodes; i++) {
          const node = queue.shift();
          sumOfNodes += node?.val!
    
          if (node?.left) queue.push(node.left);
          if (node?.right) queue.push(node.right);
        }
    
        result.push(sumOfNodes / numberOfNodes);
      }
      return result;
    }

    for (let i = 0; i < numberOfNodes; i++) {
      const node = queue.shift();
      sumOfNodes += node?.val!

      if (node?.left) queue.push(node.left);
      if (node?.right) queue.push(node.right);
    }

    result.push(sumOfNodes / numberOfNodes);
  }
  return result;
}
