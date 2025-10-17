// Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

// Example 1:
// Input: head = [1,2,3,4]
// Output: [2,1,4,3]

// Example 2:
// Input: head = []
// Output: []

// Example 3:
// Input: head = [1]
// Output: [1]

// Example 4:
// Input: head = [1,2,3]
// Output: [2,1,3]
 
// Constraints:
// The number of nodes in the list is in the range [0, 100].
// 0 <= Node.val <= 100

// Definition for singly-linked list.
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function swapPairs(head: ListNode | null): ListNode | null {
    let dummy = new ListNode(-1, head);
    let preiousNode = dummy;

    // so long as we have an even set of nodes upcoming...
    while (preiousNode.next && preiousNode.next.next) {
        // ...get two nodes to swap
        let firstNode = preiousNode.next; // the odd node
        let secondNode = preiousNode.next.next; // the even node

        // ...swap em
        preiousNode.next = secondNode; // prev now points at the second node
        firstNode.next = secondNode.next; // first now points at second's next
        secondNode.next = firstNode; // second now points at first

        // ...advance the prevNode by 2
        preiousNode = preiousNode.next.next!;
    }

    return dummy.next;
};