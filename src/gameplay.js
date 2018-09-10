import { $ } from './utils';

class Gameplay {
  constructor(board, p1, p2) {
    this.board = board;
    this.p1 = p1;
    this.p2 = p2;
    this.totalTurn = 0;
    this.activePlayer = {};
    this.inactivePlayer = {};
    this.totalPieces = this.board.size * this.board.size;
    this.init();

    return this;
  }

  isShowHint() {
    return this.totalTurn <= 2;
  }

  showWinner() {
    const draw = this.activePlayer.score === this.inactivePlayer.score;
    const winner = this.activePlayer.score >= this.inactivePlayer.score ?
                   this.activePlayer.name : this.inactivePlayer.name;

    if (window.confirm(`${draw ? 'It\'s a draw!' : 'Player ' + winner + 'wins!'}. Start a new game?`)) {
      window.location.reload();
    }
  }

  nextTurn(color, selectedPcs) {

    this.activePlayer = this.totalTurn % 2 === 1 ? this.p1 : this.p2;
    this.inactivePlayer = this.totalTurn % 2 === 1 ? this.p2 : this.p1;

    this.activePlayer.setPieces(color, this.isShowHint() ? selectedPcs : null);

    if (!this.isShowHint()) {
      const newPieces = this.board.connectNeighboringPiece(this.activePlayer.color, this.activePlayer.coords);
      this.activePlayer.addPiece(newPieces, this.totalPieces);
    }

    this.inactivePlayer.setActiveTurn();
    this.totalTurn++;
    this.board.toggleHints(this.isShowHint());

    if (this.activePlayer.score + this.inactivePlayer.score === 100) {
      return this.showWinner();
    }
  }

  init() {
    this.board.onPieceClick = (e) => {
      if (e.target.id === 'sq') return this.nextTurn();

      const selectedColor = e.target.style.backgroundColor;
      if (selectedColor === this.activePlayer.color || selectedColor === this.inactivePlayer.color) return;

      let selectedPcs = [e.target.id];

      if (this.isShowHint()) {
        selectedPcs = this.board.getNeighboringEdges(e.target.id);
      }

      this.nextTurn(selectedColor, selectedPcs);
    }
    $('rst').addEventListener('click', this.showWinner.bind(this));
    this.nextTurn();
  }
}

export default Gameplay
