// Given the root of a binary tree, return all root-to-leaf paths in any order.

// A leaf is a node with no children.

// Example 1:
// Input: root = [1,2,3,null,5]
// Output: ["1->2->5","1->3"]

// Example 2:
// Input: root = [1]
// Output: ["1"]

// Constraints:
// The number of nodes in the tree is in the range [1, 100].
// -100 <= Node.val <= 100

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


function binaryTreePaths(root: TreeNode | null): string[] {
    let output: string[] = []

    function recurse(node: TreeNode | null, path: string): void {
        if (!node) return

        const newPath = path ? `${path}->${node.val}` : `${node.val}`

        if (!node.left && !node.right) {
            output.push(newPath)
            return
        }

        recurse(node.left, newPath)
        recurse(node.right, newPath)
    }

    recurse(root, "")

    return output
};

// function iterativeBinaryTreePaths(root: TreeNode | null): string[] {
//     let output: string[] = []
//     let stack: TreeNode[]



// }