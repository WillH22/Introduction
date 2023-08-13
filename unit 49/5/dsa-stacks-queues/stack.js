/** Node: node for a stack. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Stack: chained-together nodes where you can
 *  remove from the top or add to the top. */

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** push(val): add new value to end of the stack. Returns undefined. */

  push(val) {
    const newN = new Node(val);
    this.size++;
    if (!this.first) {
      this.first = newN;
      this.last = newN;
      return undefined;
    }
    const head = this.first;
    this.first = newN;
    this.first.next = head;
  }

  /** pop(): remove the node from the top of the stack
   * and return its value. Should throw an error if the stack is empty. */

  pop() {
    if (this.size > 0) {
      this.size--;
    } else {
      throw new Error();
    }
    const val = this.first.val;
    if (this.first.next) {
      this.first = this.first.next;
      return val;
    } else {
      this.first = null;
      this.last = null;
      return val;
    }
  }

  /** peek(): return the value of the first node in the stack. */

  peek() {
    if (this.first) return this.first.val;
  }

  /** isEmpty(): return true if the stack is empty, otherwise false */

  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

module.exports = Stack;
