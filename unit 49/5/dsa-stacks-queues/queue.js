/** Node: node for a queue. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** enqueue(val): add new value to end of the queue. Returns undefined. */

  enqueue(val) {
    const newN = new Node(val);
    this.size++;
    if (!this.first) {
      this.first = newN;
      this.last = newN;
      return undefined;
    }
    const current = this.last;
    current.next = newN;
    this.last = newN;
  }

  /** dequeue(): remove the node from the start of the queue
   * and return its value. Should throw an error if the queue is empty. */

  dequeue() {
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

  /** peek(): return the value of the first node in the queue. */

  peek() {
    if (this.first) return this.first.val;
  }

  /** isEmpty(): return true if the queue is empty, otherwise false */

  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

module.exports = Queue;
