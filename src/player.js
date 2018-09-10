class Player {
  constructor(el, scoreEl) {
    this.name = el.id.toUpperCase();
    this.score = 0;
    this.scoreEl = scoreEl;
    this.el = el;
    this.color = '';
    this.coords = [];
  }

  setActiveTurn() {
    this.el.style.opacity = 1;
  }

  setPieces(color, selectedPcs) {
    if (selectedPcs) this.addPiece(selectedPcs);
    if (color) {
      this.color = color;
      this.el.style.color = color;
    }

    this.el.style.removeProperty('opacity');
  }

  addPiece(newCoords, totalPieces) {
    this.coords = [...new Set([...this.coords, ...newCoords])];
    this.score = Math.ceil(this.coords.length / totalPieces * 100) || 0;
    this.scoreEl.textContent = this.score + '%'
    return this.coords.length;
  }
}

export default Player
