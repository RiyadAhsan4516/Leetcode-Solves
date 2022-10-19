// Remove Duplicates in an array
var removeDuplicates = function (nums) {
  let slow = 0,
    count = 0;

  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[slow] !== nums[fast]) slow++;
    else count++;
    nums[slow] = nums[fast];
  }

  return nums.length - count;
};

let arr = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
// console.log(removeDuplicates(arr));

//-----------------------------------------------------------------------------------------------------------------------

// 217. Contains Duplicates
var containsDuplicate = function (nums) {
  let checker = {};
  for (let i = 0; i < nums.length; i++) {
    if (checker[nums[i]] != undefined) return false;
    else checker[nums[i]] = nums[i];
  }
  return true;
};

// console.log(containsDuplicate([1, 2, 3, 4]));

//-----------------------------------------------------------------------------------------------------------------------

//169. Majority element:
var majorityElement = function (nums) {
  if (nums.length == 1) return nums[0];
  const value = Math.floor(nums.length / 2);
  const obj = {};
  let flag = 0;
  for (let i = 0; i < nums.length; i++) {
    if (obj[nums[i]] != undefined) {
      obj[nums[i]] += 1;
      if (obj[nums[i]] > value && obj[nums[i]] > flag) flag = nums[i];
    } else {
      obj[nums[i]] = 1;
    }
  }
  return flag;
};

// console.log(majorityElement([1, 2]));

//-----------------------------------------------------------------------------------------------------------------------

// 838. Push Dominoes

// let dominoes = prompt("Enter your string: ");
// let dominoes = ".L.R...LR..L..";

const BrutForceApproach = async function (dominoes) {
  dominoes = dominoes.split("");
  let str = [...dominoes];
  let x = true;
  while (x) {
    for (let i = 0; i < dominoes.length; i++) {
      if (i == 0 || i == dominoes.length - 1) {
        if (dominoes[i] == ".") {
          if (i == 0 && dominoes[i + 1] == "L") str[i] = "L";
          else if (i == dominoes.length - 1 && dominoes[i - 1] == "R")
            str[i] = "R";
          else str[i] = dominoes[i];
        }
      } else if (
        dominoes[i] == "." &&
        dominoes[i - 1] == "R" &&
        dominoes[i + 1] != "L"
      ) {
        str[i] = "R";
      } else if (
        dominoes[i] == "." &&
        dominoes[i + 1] == "L" &&
        dominoes[i - 1] != "R"
      ) {
        str[i] = "L";
      } else str[i] = dominoes[i];
    }
    x = str.join("") == dominoes.join("") ? false : true;
    dominoes = [...str];
  }
};

const twoPointersApproach = async function (dominoes) {
  let l = 0,
    r = 1;
  const arr = ("L" + dominoes + "R").split("");
  while (l < arr.length - 1) {
    while (arr[r] == ".") r++;
    if (arr[l] == arr[r]) for (let i = l + 1; i < r; i++) arr[i] = arr[l];
    if (arr[l] > arr[r])
      for (let i = 1; i <= (r - l - 1) / 2; i++) {
        arr[l + i] = "R";
        arr[r - i] = "L";
      }
    l = r++;
  }
  return arr.slice(1, arr.length - 1).join("");
};

// const start = performance.now();

// BrutForceApproach(dominoes);

// const end = performance.now();
// console.log(`my approach: ${(end - start) / 1000} s`);

// const start2 = performance.now();

// twoPointersApproach(dominoes);

// const end2 = performance.now();
// console.log(`two pointers approach: ${(end2 - start2) / 1000} s`);

//-----------------------------------------------------------------------------------------------------------------------

// 2. Add two numbers (Best to solve this in python since in javascript result will return in scientific form. A bit less hassle to deal with)

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function CreateList(arr) {
  const head = new ListNode(arr[0]);
  let tail = head;
  for (let i = 1; i < arr.length; i++) {
    tail.next = new ListNode(arr[i]);
    tail = tail.next;
  }
  return head;
}

function Printlist(head) {
  let list = "";
  let dummy = head;
  while (dummy) {
    list += !dummy.next ? dummy.val : dummy.val + " -> ";
    dummy = dummy.next;
  }
  console.log(`${list}`);
}

var addTwoNumbers = function (l1, l2) {
  let num1 = "";
  let num2 = "";
  let dummy1 = l1;
  let dummy2 = l2;
  while (dummy1) {
    num1 = dummy1.val + num1;
    dummy1 = dummy1.next;
  }
  while (dummy2) {
    num2 = dummy2.val + num2;
    dummy2 = dummy2.next;
  }
  const num3 = `${num1 * 1 + num2 * 1}`;
  const head = new ListNode(num3[num3.length - 1] * 1);
  let tail = head;
  for (let i = num3.length - 2; i >= 0; i--) {
    tail.next = new ListNode(num3[i] * 1);
    tail = tail.next;
  }
  return head;
};

// const l1 = CreateList([
//   1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 0, 0, 1,
// ]);
// const l2 = CreateList([5, 6, 4]);
// const l3 = addTwoNumbers(l1, l2);

// Printlist("1st list", l1);
// Printlist("2nd list", l2);
// Printlist("Their sum", l3);

//-----------------------------------------------------------------------------------------------------------------------

// 206. Reverse Linked List

var reverseList = function (head) {
  let c = head;
  let p = null;
  while (c) {
    let temp = c.next;
    c.next = p;
    p = c;
    c = temp;
  }
  return p;
};

// const head = CreateList([11, 12, 13]);
// const head2 = reverseList(head);
// Printlist("reversed", head2);

//-----------------------------------------------------------------------------------------------------------------------

// 21. Merge two sorted lists

var mergeTwoLists = function (list1, list2) {
  let head = new ListNode(0);
  let tail = head;
  while (list1 || list2) {
    if (list1 && list2 && list1.val < list2.val) {
      tail.next = list1;
      tail = tail.next;
      list1 = list1.next;
      continue;
    } else if (list1 && list2 && list1.val > list2.val) {
      tail.next = list2;
      tail = tail.next;
      list2 = list2.next;
      continue;
    } else {
      if (list1) {
        tail.next = list1;
        tail = tail.next;
        list1 = list1.next;
      } else {
        tail.next = list2;
        tail = tail.next;
        list2 = list2.next;
      }
    }
  }
  head = head.next;
  return head;
};

// const list1 = CreateList([]);
// const list2 = CreateList([]);
// const list3 = mergeTwoLists(list1, list2);
// Printlist("Merged lists", list3);

//-----------------------------------------------------------------------------------------------------------------------

var reverseOnlyLetters = function (s) {
  let c = [];
  for (let index = 0; index < s.length; index++) {
    if (
      (s.charCodeAt(index) >= 65 && s.charCodeAt(index) <= 90) ||
      (s.charCodeAt(index) >= 97 && s.charCodeAt(index) <= 122)
    )
      c.unshift(s[index]);
  }
  for (let i = 0; i < s.length; i++) {
    if (
      (s.charCodeAt(i) >= 65 && s.charCodeAt(i) <= 90) ||
      (s.charCodeAt(i) >= 97 && s.charCodeAt(i) <= 122)
    )
      continue;
    else {
      c.splice(i, 0, s[i]);
    }
  }
  return c.join("");
};

// console.log(reverseOnlyLetters("Test1ng-Leet=code-Q!"));

//-----------------------------------------------------------------------------------------------------------------------

//83. Remove Duplicates from Sorted List

var deleteDuplicates1 = function (head) {
  let p = new ListNode(0);
  let c = head;
  p.next = c;
  let listTable = {};
  while (c) {
    if (listTable[c.val.toString()]) {
      p.next = c.next;
      c = c.next;
    } else {
      listTable[c.val.toString()] = c.val.toString();
      c = c.next;
      p = p.next;
    }
  }
  return head;
};

// const list1 = CreateList([0, 0, 0, 0, 0]);
// const newhead = deleteDuplicates1(list1);
// Printlist("New list", newhead);

//-----------------------------------------------------------------------------------------------------------------------

// 82. Remove Duplicates from Sorted List II

var deleteDuplicates = function (head) {
  let c = head;
  let listTable = {};
  while (c) {
    if (c.next && c.val == c.next.val) {
      listTable[c.val.toString()] = c.val.toString();
      c.val = "flag";
      c = c.next;
    } else if (listTable[c.val.toString()]) {
      c.val = "flag";
      c = c.next;
    } else {
      c = c.next;
    }
  }
  let p = new ListNode(0);
  let temp = head;
  head = p;
  while (temp) {
    if (temp.val != "flag") {
      p.next = temp;
      p = p.next;
      temp = temp.next;
    } else {
      temp = temp.next;
    }
  }
  p.next = temp;
  head = head.next;
  return head;
};

// const list1 = CreateList([1, 2, 2, 3, 3, 5]);
// const newhead = deleteDuplicates(list1);
// Printlist("New list", newhead);

//-----------------------------------------------------------------------------------------------------------------------

// 24. Swap Nodes in Pairs

var swapPairs = function (head) {
  if (!head) return null;
  let c = head;
  let tail = c.next;
  let counter = 0;
  while (tail) {
    if (counter == 0) {
      [c.val, tail.val] = [tail.val, c.val];
      counter++;
    } else if (counter == 1) {
      counter--;
    }
    tail = tail.next;
    c = c.next;
  }
  return head;
};

// const list1 = CreateList([]);
// const newhead = swapPairs(list1);
// Printlist("New list", newhead);

//-----------------------------------------------------------------------------------------------------------------------

// 19. Remove Nth Node From End of List

var removeNthFromEnd = function (head, n) {
  if (!head) return head;
  let line = [];
  let count = 0;
  let dummy = head;
  while (dummy) {
    line.push(dummy.val);
    dummy = dummy.next;
  }
  let index = line.length - n;
  let c = new ListNode(0);
  c.next = head;
  head = c;
  let temp = c.next;
  while (temp) {
    if (count == index) {
      c.next = temp.next;
      return head.next;
    } else {
      count++;
      temp = temp.next;
      c = c.next;
    }
  }
  return head.next;
};
// const list1 = CreateList([4, 5, 4]);
// const newHead = removeNthFromEnd(list1, 1);
// Printlist("new list", newHead);

//-----------------------------------------------------------------------------------------------------------------------

// 141. Linked List Cycle

var hasCycle = function (head) {
  if (!head) return false;
  let p = head;
  let q = p.next;
  while (p && q) {
    if (q.next == p) {
      return true;
    } else {
      p = p.next;
      q = q.next;
      if (q && q.next) q = q.next;
    }
  }
  return false;
};

//-----------------------------------------------------------------------------------------------------------------------

// 3. Longest Substring Without Repeating Characters

var lengthOfLongestSubstring = function (s) {
  if (s.length < 1) return 0;
  let max = 0;
  let p = 0;
  let i = 0;
  let count = 0;
  let elementTable = {};
  while (i < s.length) {
    if (!elementTable[s[i]]) {
      count++;
      elementTable[s[i]] = s[i];
      max = max < count ? count : max;
      i++;
    } else {
      count = 0;
      p += 1;
      i = p;
      elementTable = {};
    }
  }
  return max;
};

// console.log(lengthOfLongestSubstring("a"));

//-----------------------------------------------------------------------------------------------------------------------

// 28. Find the Index of the First Occurrence in a String

var strStr = function (haystack, needle) {
  if (haystack.length < 1) {
    let flag = needle.length < 1 ? 0 : -1;
    return flag;
  }
  haystack = haystack.split(needle);
  let length = haystack.length;
  if (length > 1) {
    return haystack[0].length;
  } else {
    return -1;
  }
};

// console.log(strStr("dvdabdd", "abc"));

//-----------------------------------------------------------------------------------------------------------------------

// 682. Baseball Game
var calPoints = function (operations) {
  if (!operations) return 0;
  const record = [];
  for (let i = 0; i < operations.length; i++) {
    if (operations[i] == "+") {
      let val = record[record.length - 1] + record[record.length - 2];
      record.push(val);
    } else if (operations[i] == "D") {
      record.push(record[record.length - 1] * 2);
    } else if (operations[i] == "C") {
      record.pop();
    } else {
      record.push(Number(operations[i]));
    }
  }
  let sum = record.reduce(function (acc, val) {
    return acc + val;
  }, 0);
  return sum;
};

// console.log(calPoints(["1", "C"]));

//-----------------------------------------------------------------------------------------------------------------------

// 1598. Crawler Log Folder

var minOperations = function (logs) {
  if (!logs) return 0;
  const stack = [];
  for (let i = 0; i < logs.length; i++) {
    if (logs[i] == "../") {
      if (stack) stack.pop();
      else continue;
    } else if (logs[i] == "./") {
      continue;
    } else {
      stack.push(logs[i]);
    }
  }
  return stack.length;
};

// console.log(minOperations(["d1/", "../", "../", "../"]));

//-----------------------------------------------------------------------------------------------------------------------

// 844. Backspace String Compare

var backspaceCompare = function (s, t) {
  const stack1 = [];
  const stack2 = [];

  s.split("").forEach((el) => {
    if (stack1 && el == "#") stack1.pop();
    else stack1.push(el);
  });
  t.split("").forEach((el) => {
    if (stack2 && el == "#") stack2.pop();
    else stack2.push(el);
  });

  return stack1.join("") == stack2.join("");
};

// console.log(backspaceCompare("", ""));

//-----------------------------------------------------------------------------------------------------------------------

// 2390. Removing Stars From a String

var removeStars = function (s) {
  if (!s) return s;
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] && s[i] == "*") stack.pop();
    else stack.push(s[i]);
  }
  return stack.join("");
};

// console.log(removeStars("erase*****"));

//-----------------------------------------------------------------------------------------------------------------------

// 1047. Remove All Adjacent Duplicates In String

var removeDuplicates = function (s) {
  if (!s) return s;
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] && s[i] == stack[stack.length - 1]) stack.pop();
    else stack.push(s[i]);
  }
  return stack.join("");
};

// console.log(removeDuplicates("azxxzy"));

//-----------------------------------------------------------------------------------------------------------------------

// 1700. Number of Students Unable to Eat Lunch

var countStudents = function (students, sandwiches) {
  let counter = 0;
  let i = 0;
  while (counter != students.length) {
    if (students[0] == sandwiches[i]) {
      counter = 0;
      i++;
      students.shift();
    } else {
      students.push(students.shift());
      counter++;
    }
  }
  return counter;
};

// console.log(countStudents([1, 1, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1]));

//-----------------------------------------------------------------------------------------------------------------------

// 1823. Find the Winner of the Circular Game

var findTheWinner = function (n, k) {
  let players = [];
  for (let i = 1; i <= n; i++) {
    players.push(i);
  }
  k = k - 1;
  let r = 0;
  while (players.length > 1) {
    r = (r + k) % players.length;
    players.splice(r, 1);
  }
  return players[0];
};

// console.log(findTheWinner(5, 3));

//-----------------------------------------------------------------------------------------------------------------------
// BINARY TREES
//-----------------------------------------------------------------------------------------------------------------------

// Necessary constructions
class Listnode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Create any binary tree(not just a binary search tree)
const createTree = (arr) => {
  const root = new Listnode(arr[0]);
  let queue = [root];
  let j = 1;
  let i = 0;
  while (j < arr.length) {
    let dummy = queue[i];
    if (dummy.left == null) {
      if (arr[j] != null) {
        let newnode = new Listnode(arr[j]);
        dummy.left = newnode;
        queue.push(newnode);
      }
      j++;
    }
    if (dummy.right == null) {
      if (arr[j] != null) {
        let newnode = new Listnode(arr[j]);
        dummy.right = newnode;
        queue.push(newnode);
      }
      j++;
    }
    i++;
  }
  return root;
};

//-----------------------------------------------------------------------------------------------------------------------

// 96. Unique Binary Search Trees

var numTrees = function (n) {
  let r = n;
  let p = 2 * n;
  let c = p - r;
  for (let i = 1; i < p; i++) {
    p = p * i;
  }
  for (let i = 1; i < n; i++) {
    n = n * i;
  }
  for (let i = 1; i < c; i++) {
    c = c * i;
  }

  let fact = p / (c * n);

  return fact / (r + 1);
};

// console.log(numTrees(3));

//-----------------------------------------------------------------------------------------------------------------------

// 102. Binary Tree Level Order Traversal
const levelorder = function (root) {
  let queue = [root];
  const result = [];
  while (queue.length > 0) {
    let level = [];
    let children = [];
    queue.forEach((node) => {
      level.push(node.val);
      if (node.left) children.push(node.left);
      if (node.right) children.push(node.right);
    });
    result.push(level);
    queue = children;
  }
  return result;
};
// const header = createTree(["A", "B", "C", "D", "E", "F", "G"]);
// console.log(levelorder(header));

//-----------------------------------------------------------------------------------------------------------------------

//404. Sum of Left Leaves:
var sumOfLeftLeaves = function (root) {
  if (!root) return 0;
  else if (
    root.left != null &&
    root.left.left == null &&
    root.left.right == null
  ) {
    return root.left.val + sumOfLeftLeaves(root.right);
  } else {
    return sumOfLeftLeaves(root.left) + sumOfLeftLeaves(root.right);
  }
};

// const root = createTree([-9, -3, 2, null, 4, 4, 0, -6, null, -5]);
// console.log(sumOfLeftLeaves(root));

//-----------------------------------------------------------------------------------------------------------------------

// ****53. Maximum Subarray (kadane's algorithm)

var maxSubArray = function (nums) {
  let sum = nums[0];
  let start = nums[0];
  for (let i = 1; i < nums.length; i++) {
    start = Math.max(nums[i], nums[i] + start);
    sum = Math.max(end, sum);
  }
  return sum;
};

// console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

// 2 questions to be kept in mind here:
// for start: is it profitable to start from the current index? or extending to this index?
// for sum: okay we saw that extending gives us a value that is greater than the current index. but after extending does the sum become more than it was?

//-----------------------------------------------------------------------------------------------------------------------

// 237. Delete Node in a Linked List

var deleteNode = function (node) {
  if (!node.next) {
    node = node.next;
    return;
  } else {
    node.val = node.next.val;
    node.next = node.next.next;
  }
};

//-----------------------------------------------------------------------------------------------------------------------

// 350. Intersection of Two Arrays II

var intersect = function (nums1, nums2) {
  let numslist = {};
  let query = nums1.length <= nums2.length ? nums1 : nums2;
  let compare = query != nums1 ? nums1 : nums2;
  query.forEach((el) => {
    if (numslist[el] != undefined) numslist[el] += 1;
    else numslist[el] = 1;
  });
  const result = [];
  for (let i = 0; i < compare.length; i++) {
    if (numslist[compare[i]] != undefined) {
      result.push(compare[i]);
    }
  }
  console.log(numslist);
  console.log(result);
};

intersect([1, 2, 2, 1], [2, 2, 2]);
