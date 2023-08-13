/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    let toVisit = [this.root];
    let total = 0;
    while (toVisit[0]) {
      let current = toVisit.shift();
      total++;
      if (!current.left && !current.right) {
        return total;
      }
      if (current.left) toVisit.push(current.left);
      if (current.right) toVisit.push(current.right);
    }
    return total;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    let toVisit = [this.root];
    let total = 1;
    let grandTotal = 1;
    if (!toVisit[0]) return 0;
    while (toVisit[0]) {
      let current = toVisit.pop();
      if (current.left || current.right) total++;
      if (current.left) toVisit.push(current.left);
      if (current.right) toVisit.push(current.right);
      if (!current.left && !current.right) {
        if (total > grandTotal) grandTotal = total;
      }
    }
    return grandTotal;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let total = 0;

    function _maxSum(current) {
      if (current === null) return 0;
      const leftSum = _maxSum(current.left);
      const rightSum = _maxSum(current.right);
      total = Math.max(total, current.val + leftSum + rightSum);
      return Math.max(0, leftSum + current.val, rightSum + current.val);
    }

    _maxSum(this.root);
    return total;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let toVisit = [this.root];
    let result = null;
    while (toVisit[0]) {
      let current = toVisit.pop();
      if (!result && current.val > lowerBound) result = current.val;
      if (current.val > lowerBound && current.val < result)
        result = current.val;
      if (current.left) toVisit.push(current.left);
      if (current.right) toVisit.push(current.right);
    }
    return result;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {}

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {}

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {}

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {}
}

module.exports = { BinaryTree, BinaryTreeNode };
