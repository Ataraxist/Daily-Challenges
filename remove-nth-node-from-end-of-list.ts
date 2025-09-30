// Given the head of a linked list, remove the nth node from the end of the list and return its head.

// Example 1:
// Input: head = [1,2,3,4,5], n = 2
// Output: [1,2,3,5]

// Example 2:
// Input: head = [1], n = 1
// Output: []

// Example 3:
// Input: head = [1,2], n = 1
// Output: [1]
 
// Constraints:
// The number of nodes in the list is sz.
// 1 <= sz <= 30
// 0 <= Node.val <= 100
// 1 <= n <= sz
 

// Follow up: Could you do this in one pass?

// Definition for singly-linked list.
// class ListNode {
//     val: number
//     next: ListNode | null
//     constructor(val?: number, next?: ListNode | null) {
//         this.val = (val===undefined ? 0 : val)
//         this.next = (next===undefined ? null : next)
//     }
// }

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    // Early Abort
    if (!head) return null

    // Setup
    let fast: ListNode | null = head
    let slow: ListNode | null = head

    // Move fast pointer n steps ahead of slow
    for (let i = 0; i < n; i++) {
        if (fast) fast = fast.next
    }

    // If fast is null, we're removing the head
    if (!fast) {
        return head.next
    }

    // Move both pointers until fast reaches the end
    while (fast.next) {
        slow = slow!.next
        fast = fast.next
    }

    // Remove the nth node from end
    slow!.next = slow!.next!.next

    return head
};