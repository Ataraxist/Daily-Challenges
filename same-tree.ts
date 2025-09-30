// Given the roots of two binary trees p and q, write a function to check if they are the same or not.

// Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

// Example 1:
// Input: p = [1,2,3], q = [1,2,3]
// Output: true

// Example 2:
// Input: p = [1,2], q = [1,null,2]
// Output: false

// Example 3:
// Input: p = [1,2,1], q = [1,1,2]
// Output: false
 
// Constraints:
// The number of nodes in both trees is in the range [0, 100].
// -104 <= Node.val <= 104


// Definition for a binary tree node.
// class TreeNode {
//     val: number
//     left: TreeNode | null
//     right: TreeNode | null
//     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
//         this.val = (val===undefined ? 0 : val)
//         this.left = (left===undefined ? null : left)
//         this.right = (right===undefined ? null : right)
//     }
// }

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if ((!p && q) || (p && !q)) {
        return false
    } else if (!p && !q) {
        return true
    }
    if (p!.val !== q!.val) return false

    const stack:(TreeNode | null)[][] = [[p!,q!]]

    while (stack.length > 0){
        const nodePair = stack.pop()!

        // Check if one is null and the other isn't
        if (!nodePair[0] && nodePair[1]) return false
        if (nodePair[0] && !nodePair[1]) return false

        // If both are null, continue to next iteration
        if (!nodePair[0] && !nodePair[1]) continue

        if (nodePair[0]!.val !== nodePair[1]!.val) return false

        if (nodePair[0]!.left || nodePair[1]!.left) stack.push([nodePair[0]!.left,nodePair[1]!.left])
        if (nodePair[0]!.right || nodePair[1]!.right) stack.push([nodePair[0]!.right,nodePair[1]!.right])
    }

    return true
};