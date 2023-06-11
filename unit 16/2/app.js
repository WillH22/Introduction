class Game {
  constructor(player1, player2) {
    this.WIDTH = 7;
    this.HEIGHT = 6;
    this.currPlayer = player1;
    this.board = [];
    this.players = [player1, player2];

    // Bind the methods to the current instance
    this.makeBoard = this.makeBoard.bind(this);
    this.makeHtmlBoard = this.makeHtmlBoard.bind(this);
    this.findSpotForCol = this.findSpotForCol.bind(this);
    this.placeInTable = this.placeInTable.bind(this);
    this.endGame = this.endGame.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkForWin = this.checkForWin.bind(this);

    this.makeBoard();
    this.makeHtmlBoard();
  }

  /** makeBoard: create in-JS board structure */
  makeBoard() {
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));
    }
  }

  /** makeHtmlBoard: make HTML table and row of column tops */
  makeHtmlBoard() {
    const board = document.getElementById("board");

    board.innerHTML = "";

    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click", this.handleClick);

    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      top.append(headCell);
    }

    board.append(top);

    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement("tr");

      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }
  }

  /** findSpotForCol: given column x, return top empty y (null if filled) */
  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  /** placeInTable: update DOM to place piece into HTML table of board */
  placeInTable(y, x) {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.style.backgroundColor = this.currPlayer.color;

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  endGame(msg) {
    alert(msg);
  }

  /** handleClick: handle click of column top to play piece */
  handleClick(evt) {
    const x = +evt.target.id;

    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);

    if (this.checkForWin()) {
      return this.endGame(`Player ${this.currPlayer.name} won!`);
    }

    // check for tie
    if (this.board.every((row) => row.every((cell) => cell))) {
      return this.endGame("Tie!");
    }

    this.currPlayer =
      this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
  }

  /** checkForWin: check board cell-by-cell for "does a win start here?" */
  checkForWin() {
    const _win = (cells) => {
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.currPlayer
      );
    };

    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        const horiz = [
          [y, x],
          [y, x + 1],
          [y, x + 2],
          [y, x + 3],
        ];
        const vert = [
          [y, x],
          [y + 1, x],
          [y + 2, x],
          [y + 3, x],
        ];
        const diagDR = [
          [y, x],
          [y + 1, x + 1],
          [y + 2, x + 2],
          [y + 3, x + 3],
        ];
        const diagDL = [
          [y, x],
          [y + 1, x - 1],
          [y + 2, x - 2],
          [y + 3, x - 3],
        ];

        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
    return false;
  }
}

class Player {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
}

function startGame() {
  const player1Name = document.getElementById("player1").value;
  const player2Name = document.getElementById("player2").value;

  // Create player objects with selected colors
  const player1Color = document.getElementById("color1").value;
  const player2Color = document.getElementById("color2").value;

  const player1 = new Player(player1Name, player1Color);
  const player2 = new Player(player2Name, player2Color);

  // Create a new game instance
  const game = new Game(player1, player2);
}

document.getElementById("start").addEventListener("click", startGame);
