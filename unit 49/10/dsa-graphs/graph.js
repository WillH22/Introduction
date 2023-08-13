class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let v of vertexArray) {
      this.nodes.add(v);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    let adjacent = [...vertex.adjacent];
    for (let edge of adjacent) {
      edge.adjacent.delete(vertex);
    }
    vertex.adjacent.clear();
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let toVisit = [start];
    let seen = new Set(toVisit);
    let nodes = [];

    while (toVisit[0]) {
      let current = toVisit.pop();
      nodes.push(current.value);
      for (let neighbor of current.adjacent) {
        if (!seen.has(neighbor)) {
          toVisit.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return nodes;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisit = [start];
    let seen = new Set(toVisit);
    let nodes = [];

    while (toVisit[0]) {
      let current = toVisit.shift();
      nodes.push(current.value);
      for (let neighbor of current.adjacent) {
        if (!seen.has(neighbor)) {
          toVisit.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return nodes;
  }
}

module.exports = { Graph, Node };
