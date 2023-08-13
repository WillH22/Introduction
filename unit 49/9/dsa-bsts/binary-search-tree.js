class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    let newN = new Node(val);
    let current = this.root;
    if (!current) {
      this.root = newN;
      return this;
    }

    while (current) {
      if (current.val > val) {
        if (current.left) {
          current = current.left;
        } else {
          current.left = newN;
          return this;
        }
      }
      if (current.val < val) {
        if (current.right) {
          current = current.right;
        } else {
          current.right = newN;
          return this;
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    let newN = new Node(val);
    let current = this.root;
    if (!current) {
      this.root = newN;
      return this;
    }

    function _insert(val) {
      if (current.val > val) {
        if (current.left) {
          current = current.left;
        } else {
          current.left = newN;
          return;
        }
      }
      if (current.val < val) {
        if (current.right) {
          current = current.right;
        } else {
          current.right = newN;
          return;
        }
      }
      _insert(val);
    }
    _insert(val);
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;
    while (current) {
      if (current.val === val) return current;
      if (current.val > val) current = current.left;
      if (current.val < val) current = current.right;
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    let current = this.root;

    function _find(val) {
      if (current.val === val) return current;
      if (!current.left && !current.right) {
        current = undefined;
        return current;
      }
      if (current.val > val) current = current.left;
      if (current.val < val) current = current.right;
      _find(val);
    }
    _find(val);
    return current;
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let nodes = [];
    let current = this.root;
    function traverse(current) {
      nodes.push(current.val);
      if (current.left) traverse(current.left);
      if (current.right) traverse(current.right);
    }
    traverse(current);
    return nodes;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let nodes = [];
    let current = this.root;
    function traverse(current) {
      if (current.left) traverse(current.left);
      nodes.push(current.val);
      if (current.right) traverse(current.right);
    }
    traverse(current);
    return nodes;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let nodes = [];
    let current = this.root;
    function traverse(current) {
      if (current.left) traverse(current.left);
      if (current.right) traverse(current.right);
      nodes.push(current.val);
    }
    traverse(current);
    return nodes;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let nodes = [];
    let toVisit = [this.root];
    while (toVisit[0]) {
      let current = toVisit.pop();
      console.log(current);
      nodes.push(current.val);
      if (current.left) toVisit.unshift(current.left);
      if (current.right) toVisit.unshift(current.right);
    }
    return nodes;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {}

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {}

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {}
}

module.exports = BinarySearchTree;
