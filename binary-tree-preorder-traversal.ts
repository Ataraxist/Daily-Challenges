// Given the root of a binary tree, return the preorder traversal of its nodes' values.

// Example 1:
// Input: root = [1,null,2,3]
// Output: [1,2,3]


// Example 2:
// Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]
// Output: [1,2,4,5,6,7,3,8,9]

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


// Definition for a binary tree node.
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

function preorderTraversal(root: TreeNode | null): number[] {
    let output:number[] = []
    if (!root) return []

    function recurse(node: TreeNode | null): void {
        if(!node) return
        // 2. Process the current node
        output.push(node.val)
        // 3. Process all nodes in the right subtree
        recurse(node.left)
        // 1. Process all nodes in the left subtree
        recurse(node.right)
    }

    recurse(root)

    return output
};


function preorderTraversalBlind(root: TreeNode | null): number[] {
    let output:number[] = []
    if (!root) return []

    function recurse(node: TreeNode | null){
        if (!node) return
        output.push(node.val)
        recurse(node.left)
        recurse(node.right)
    }
    recurse(root)
    return output
}