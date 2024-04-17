const mongoose = require("mongoose");
const Problem = require("./models/problem"); // Import the model from the separate file

mongoose.connect("mongodb+srv://787alisniazi787:MOPowYaeBuKC1y0N@codesave.vfewjo7.mongodb.net/allproblems");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
  try {
    // Manually fill the array with 5 problem objects
    const problemsToAdd = [
      {
        title: "Two Sum",
        description:
          "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        difficulty: "Hard",
        tags: ["array", "hash table"],
        solution: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}`,
      },
      {
        title: "Add Two Numbers",
        description:
          "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
        difficulty: "Medium",
        tags: ["linked list", "math"],
        solution: `function addTwoNumbers(l1, l2) {
  let dummyHead = new ListNode(0);
  let current = dummyHead;
  let carry = 0;
  let p1 = l1, p2 = l2;
  
  while (p1 !== null || p2 !== null) {
    const val1 = p1 !== null ? p1.val : 0;
    const val2 = p2 !== null ? p2.val : 0;
    const sum = val1 + val2 + carry;
    carry = Math.floor(sum / 10);
    current.next = new ListNode(sum % 10);
    current = current.next;
    if (p1 !== null) p1 = p1.next;
    if (p2 !== null) p2 = p2.next;
  }
  
  if (carry > 0) {
    current.next = new ListNode(carry);
  }
  
  return dummyHead.next;
}`,
      },
      {
        title: "Reverse Linked List",
        description: "Reverse a singly linked list.",
        difficulty: "Easy",
        tags: ["linked list"],
        solution: `function reverseList(head) {
  let prev = null;
  let current = head;
  while (current !== null) {
    let nextTemp = current.next;
    current.next = prev;
    prev = current;
    current = nextTemp;
  }
  return prev;
}`,
      },
      {
        title: "Merge Two Sorted Lists",
        description:
          "Merge two sorted linked lists and return it as a new sorted list. The new list should be made by splicing together the nodes of the first two lists.",
        difficulty: "Easy",
        tags: ["linked list"],
        solution: `function mergeTwoLists(l1, l2) {
  if (l1 === null) return l2;
  if (l2 === null) return l1;
  
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
}`,
      },
      {
        title: "Maximum Depth of Binary Tree",
        description:
          "Given the root of a binary tree, return its maximum depth.",
        difficulty: "Easy",
        tags: ["tree", "depth-first search"],
        solution: `function maxDepth(root) {
  if (root === null) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}`,
      },
    ];

    // Save each problem to the database
    for (const problemData of problemsToAdd) {
      const problem = new Problem(problemData);
      await problem.save();
      console.log(`Added problem: ${problem.title}`);
    }

    console.log("Data successfully added to the database.");
  } catch (error) {
    console.error("Error while populating the database:", error);
  }

  // Close the connection
  mongoose.connection.close();
});
