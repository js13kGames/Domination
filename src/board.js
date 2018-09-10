import { $ } from './utils';
import Piece from './piece';

const SIZE = 20;
const COLOR = ['LightGreen', 'Salmon', 'LightSkyBlue', 'CadetBlue', 'Khaki'];
const BOARD_SIZE_PERCENTAGE = 0.65;

class Board {
  constructor() {
    this.gameContainer = $('g');
    this.gameTiles = $('gC');
    this.pieces = new Piece();
    this.size = SIZE;
    this.onPieceClick = () => {};

    return this.setup()
  }

  sameColor(el, color) {
    return el && el.style.backgroundColor === color
  }

  getNeighboringPiece(i, j) {
    return {
      left: document.getElementById(`c${i + 1}_${j}`),
      right: document.getElementById(`c${i + 1}_${j + 2}`),
      top: document.getElementById(`c${i}_${j + 1}`),
      bottom: document.getElementById(`c${i + 2}_${j + 1}`),
    }
  }

  connectNeighboringPiece(newColor, coords) {
    // const currentColor = $(coords[1]).style.backgroundColor;
    let connections = coords;
    coords.forEach(coord => {
      const idx = coord.substr(1).split('_');
      const i = parseInt(idx[0], 10) - 1;
      const j = parseInt(idx[1], 10) - 1;

      connections = this.connectNeighboringEdge(this.getNeighboringPiece(i, j), i, j, newColor, connections);

      $(coord).style.backgroundColor = newColor;
    })

    return connections;
  }

  getNeighboringEdges(id) {
    return this.pieces.getEdges(id);
  }

  connectNeighboringEdge({ left, right, top, bottom }, i, j, color, coords = []) {
    let addedEdges = coords
    if (this.sameColor(left, color) && !this.pieces.isConnected(`c${i + 1}_${j + 1}`, left.id) && !addedEdges.includes(left.id)) {
      addedEdges = [...addedEdges, ...this.getNeighboringEdges(left.id)];
      this.pieces.addEdge(`c${i + 1}_${j + 1}`, `c${i + 1}_${j}`)
    }
    if (this.sameColor(right, color) && !this.pieces.isConnected(`c${i + 1}_${j + 1}`, right.id) && !addedEdges.includes(right.id)) {
      addedEdges = [...addedEdges, ...this.getNeighboringEdges(right.id)];
      this.pieces.addEdge(`c${i + 1}_${j + 1}`, `c${i + 1}_${j + 2}`)
    }
    if (this.sameColor(top, color) && !this.pieces.isConnected(`c${i + 1}_${j + 1}`, top.id) && !addedEdges.includes(top.id)) {
      addedEdges = [...addedEdges, ...this.getNeighboringEdges(top.id)];
      this.pieces.addEdge(`c${i + 1}_${j + 1}`, `c${i}_${j + 1}`)
    }
    if (this.sameColor(bottom, color) && !this.pieces.isConnected(`c${i + 1}_${j + 1}`, bottom.id) && !addedEdges.includes(bottom.id)) {
      addedEdges = [...addedEdges, ...this.getNeighboringEdges(bottom.id)];
      this.pieces.addEdge(`c${i + 1}_${j + 1}`, `c${i + 2}_${j + 1}`)
    }
    return addedEdges;
  }

  handleClick(e) {
    this.onPieceClick(e);
  }

  setDimension(el, w, h) {
    el.style.width = w + 'px';
    el.style.height = h + 'px';
  }

  setup() {
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const smallestViewportDim = Math.min(viewportWidth, viewportHeight);
    const containerWidth = Math.ceil(smallestViewportDim * BOARD_SIZE_PERCENTAGE);

    this.gameContainer.style.margin = `${Math.floor((viewportHeight - containerWidth) / 2)}px auto`;
    this.setDimension(this.gameContainer, containerWidth, containerWidth);
    this.setDimension(this.gameTiles, containerWidth, containerWidth);

    for (let i = 0; i < SIZE; i++) {
      const row = document.createElement('div');
      row.id = `r${i + 1}`;
      this.gameTiles.appendChild(row);

      for (let j = 0; j < SIZE; j++) {
        const randomColorIdx = Math.floor(Math.random() * COLOR.length);
        const fillColor = COLOR[randomColorIdx].toLowerCase();
        const col = document.createElement('div');
        const corner = (i === 0 && ( j === 0 || j === SIZE - 1)) ||
                       (i === SIZE - 1 && (j === 0 || j === SIZE - 1));

        this.pieces.addVertex(`c${i + 1}_${j + 1}`);
        this.connectNeighboringEdge(this.getNeighboringPiece(i, j), i, j, fillColor);

        col.id = `c${i + 1}_${j + 1}`;
        col.className = 'col' + (corner ? '' : ' disable-start');
        col.style.backgroundColor = fillColor;
        col.addEventListener('click', this.handleClick.bind(this))
        this.setDimension(col, (containerWidth / SIZE).toFixed(2), (containerWidth / SIZE).toFixed(2));
        $(`r${i + 1}`).appendChild(col);
      }
    }

    g.style.display = 'block';

    return this
  }

  toggleHints(showHint) {
    const els = document.querySelectorAll('.disable-start');
    els.forEach(el => showHint ? el.style.opacity = 0.45 : el.style.removeProperty('opacity'));
  }
}

export default Board
