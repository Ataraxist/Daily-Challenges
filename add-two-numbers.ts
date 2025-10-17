// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

 

// Example 1:


// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [7,0,8]
// Explanation: 342 + 465 = 807.
// Example 2:

// Input: l1 = [0], l2 = [0]
// Output: [0]
// Example 3:

// Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// Output: [8,9,9,9,0,0,0,1]
 

// Constraints:

// The number of nodes in each linked list is in the range [1, 100].
// 0 <= Node.val <= 9
// It is guaranteed that the list represents a number that does not have leading zeros.


// Definition for singly-linked list.
// class ListNode {
//     val: number
//     next: ListNode | null
//     constructor(val?: number, next?: ListNode | null) {
//         this.val = (val===undefined ? 0 : val)
//         this.next = (next===undefined ? null : next)
//     }
// }

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let l1NumReverse = []
    let l2NumReverse = []

    while (l1) {
        l1NumReverse.push(l1.val)
        l1 = l1.next
    }
    while (l2) {
        l2NumReverse.push(l2.val)
        l2 = l2.next
    }

    const l1Num = l1NumReverse.reverse().join('')
    const l2Num = l2NumReverse.reverse().join('')

    let sum = BigInt(l1Num) + BigInt(l2Num)
    let sumArray = Array.from(String(sum), Number).reverse()

    let list = null
    for (let i = sumArray.length -1; i >= 0; i--){
        list = { val: sumArray[i], next: list }
    }

    return list
};
