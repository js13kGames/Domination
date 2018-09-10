class Piece {
  constructor() {
    this.AdjList = new Map();
    this.search = [];
  }

  addVertex(v) {
    this.AdjList.set(v, []);
  }

  addEdge(v, w) {
    this.AdjList.get(v).push(w);
    this.AdjList.get(w).push(v);
  }

  isConnected(v, w) {
    return this.AdjList.get(v).includes(w);
  }

  getDifference(a, b) {
    if (a.length > b.length) {
      return a.filter(item => !b.includes(item))
    } else {
      return b.filter(item => !a.includes(item))
    }
  }

  traverse(arr, val) {
    const values = this.AdjList.get(val);
    const union = [...new Set([...values, ...arr, val])];
    const notFound = arr.length > 0 ? this.getDifference(arr, union) : values;
    arr = [...union];

    if (notFound.length === 0 ) {
      this.search = [...new Set([...arr, ...this.search])];
      return arr
    };

    for (let j = 0; j < notFound.length; j++) {
      this.traverse(arr, notFound[j]);
    }
  }

  getEdges(val) {
    const arr = [];
    this.search = [];
    this.traverse(arr, val);
    return this.search;
  }
}

export default Piece
