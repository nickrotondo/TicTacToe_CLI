let prompt = require('readline-sync');

let TicTacToe = function () {
  this.board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  /*
  Starting board:
  ———————————
  | 1  2  3 |
  | 4  5  6 |
  | 7  8  9 |
  ———————————
  */
  this.piece = 'X';
  this.currentMove = 0;
};

TicTacToe.prototype.placePiece = function (row, col) {
  this.board[row][col] = this.piece;
  this.currentMove++;
};

TicTacToe.prototype.changeTurn = function () {
  this.piece = this.piece === 'X' ? 'O' : 'X';
};

TicTacToe.prototype.printError = function (errorMessage) {
  console.error(`Error: ${errorMessage}`);
};

TicTacToe.prototype.convertToRowCol = function (move) {
  let row = Math.floor((move - 1) / 3);
  let col = (move - 1) % 3;
  return { row, col };
};

TicTacToe.prototype.hasMoveBeenPlayed = function (move) {
  let { row, col } = this.convertToRowCol(move);
  return typeof this.board[row][col] === 'string';
};

TicTacToe.prototype.checkForValidMove = function (move) {
  move = Number(move);
  if (move > 9 || move < 1) {
    this.printError('input must be between 1 and 9');
    return true;
  } else if (Math.floor(move) !== move) {
    this.printError('input must be an integer');
    return true;
  } else if (this.hasMoveBeenPlayed(move)) {
    this.printError('that move has already been played');
    return true;
  } else {
    return false;
  }
};

TicTacToe.prototype.areAllPiecesEqual = function (x, y, z) {
  return (x === y && y === z);
};

TicTacToe.prototype.isRowWinner = function (row) {
  return this.areAllPiecesEqual(this.board[row][0], this.board[row][1], this.board[row][2]);
};

TicTacToe.prototype.isColWinner = function (col) {
  return this.areAllPiecesEqual(this.board[0][col], this.board[1][col], this.board[2][col]);
};

TicTacToe.prototype.isDiagonalWinner = function () {
  return this.areAllPiecesEqual(this.board[0][0], this.board[1][1], this.board[2][2]) || this.areAllPiecesEqual(this.board[0][2], this.board[1][1], this.board[2][0]);
};

TicTacToe.prototype.isWinner = function (row, col) {
  return (this.isRowWinner(row) || this.isColWinner(col) || this.isDiagonalWinner());
};

TicTacToe.prototype.printWinner = function() {
  console.log(`${this.piece} WINS!`);
};

TicTacToe.prototype.isDraw = function () {
  return this.moves === 9;
};

TicTacToe.prototype.printDraw = function() {
  console.log('DRAW. No one wins...');
};

TicTacToe.prototype.printBoard = function() {
  console.log('———————————')
  console.log(`| ${this.board[0][0]}  ${this.board[0][1]}  ${this.board[0][2]} |`);
  console.log(`| ${this.board[1][0]}  ${this.board[1][1]}  ${this.board[1][2]} |`);
  console.log(`| ${this.board[2][0]}  ${this.board[2][1]}  ${this.board[2][2]} |`);
  console.log('———————————')
};

TicTacToe.prototype.promptPlayerMove = function() {
  let move;
  do {
    move = prompt.question(`${this.piece}, it's your turn! Please choose a move (1-9): `);
  } while(this.checkForValidMove(move));
  return this.convertToRowCol(move);
};

TicTacToe.prototype.play = function() {
  this.printBoard();
  let {row, col} = this.promptPlayerMove();
  this.placePiece(row, col);
  if(this.isWinner(row, col)) {
    this.printWinner();
  } else if(this.isDraw()) {
    this.printDraw();
  } else {
    this.changeTurn();
    this.play();
  }
};

let game = new TicTacToe();
game.play();
