// Given the root of a binary tree, return the inorder traversal of its nodes' values.

// Example 1:
// Input: root = [1,null,2,3]
// Output: [1,3,2]

// Example 2:
// Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]
// Output: [4,2,6,5,7,1,3,9,8]

// Example 3:
// Input: root = []
// Output: []

// Example 4:
// Input: root = [1]
// Output: [1]

// Constraints:
// The number of nodes in the tree is in the range [0, 100].
// -100 <= Node.val <= 100
 
// Follow up: Recursive solution is trivial, could you do it iteratively?

//Definition for a binary tree node.
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
 

function inorderTraversal(root: TreeNode | null): number[] {
    let output:number[] = []
    if (!root) return []

    function recurse(node: TreeNode | null): void {
        if(!node) return
        // 1. Process all nodes in the left subtree
        recurse(node.left)
        // 2. Process the current node
        output.push(node.val)
        // 3. Process all nodes in the right subtree
        recurse(node.right)
    }

    recurse(root)

    return output
};

function inorderTraversalIterative(root: TreeNode | null): number[] {
    const output: number[] = []
    const stack: TreeNode[] = []
    let current = root

    while (current || stack.length > 0) {
        // Go to the leftmost node
        while (current) {
            stack.push(current)
            current = current.left
        }

        // Current must be null at this point
        current = stack.pop()!
        output.push(current.val)

        // Visit the right subtree
        current = current.right
    }

    return output
}