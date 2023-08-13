/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newN = new Node(val);
    if (!this.head) this.head = newN;
    if (this.tail) this.tail.next = newN;
    this.tail = newN;
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newN = new Node(val);
    if (!this.head) {
      this.head = newN;
      this.tail = newN;
    } else {
      const oldHead = this.head;
      this.head = newN;
      this.head.next = oldHead;
    }
    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {
    let current = this.head;
    const oldTail = this.tail.val;
    if (!current.next) {
      this.head = null;
      this.tail = null;
    }
    while (current.next && current.next.next) {
      current = current.next;
    }
    if (this.tail) {
      this.tail = current;
      this.tail.next = null;
    }
    this.length--;
    return oldTail;
  }

  /** shift(): return & remove first item. */

  shift() {
    const oldHead = this.head.val;
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    this.length--;
    return oldHead;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    let i = 0;
    let current = this.head;
    while (i !== idx) {
      i++;
      current = current.next;
    }
    return current.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let i = 0;
    let current = this.head;
    while (i !== idx) {
      i++;
      current = current.next;
    }
    current.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    const newN = new Node(val);
    if (!this.head) {
      this.head = newN;
      this.tail = newN;
    }
    if (idx === 0) {
      const oldHead = this.head;
      this.head = newN;
      this.head.next = oldHead;
    } else {
      let i = 1;
      let current = this.head;
      while (i !== idx) {
        i++;
        current = current.next;
      }
      if (this.tail === current) {
        current.next = newN;
        this.tail = newN;
      } else {
        const oldNext = current.next;
        current.next = newN;
        newN.next = oldNext;
      }
    }
    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    let i = 1;
    let current = this.head;
    this.length--;
    if (!current.next) {
      this.head = null;
      this.tail = null;
      return current.val;
    }
    if (!current.next.next) {
      const oldNext = current.next.val;
      this.tail = current;
      return oldNext;
    }
    while (i !== idx) {
      i++;
      current = current.next;
    }
    const oldNext = current.next.val;
    current.next = current.next.next;
    return oldNext;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;
    let current = this.head;
    let total = 0;
    while (current) {
      total += current.val;
      current = current.next;
    }
    return total / this.length;
  }
}

module.exports = LinkedList;
