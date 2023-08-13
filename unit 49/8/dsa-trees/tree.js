/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    let toVisit = [this.root];
    let total = 0;
    while (toVisit[0]) {
      let current = toVisit.pop();
      total += current.val;
      for (let child of current.children) {
        toVisit.push(child);
      }
    }
    return total;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    let toVisit = [this.root];
    let evens = 0;
    while (toVisit[0]) {
      let current = toVisit.pop();
      if (current.val % 2 === 0) evens++;
      for (let child of current.children) {
        toVisit.push(child);
      }
    }
    return evens;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    let toVisit = [this.root];
    let total = 0;
    while (toVisit[0]) {
      let current = toVisit.pop();
      if (current.val > lowerBound) total++;
      for (let child of current.children) {
        toVisit.push(child);
      }
    }
    return total;
  }
}

module.exports = { Tree, TreeNode };
