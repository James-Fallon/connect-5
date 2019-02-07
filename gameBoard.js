/**
 * Represents the connect5 board.
 */
class GameBoard {
  constructor() {
    this.numRows = 6;
    this.numCols = 9;
    this.grid = this.createBoard();
  }

  /**
   * @returns {string} A printable version of the board.
   */
  display() {
    let outputString = '';
    for (let row = 0; row < this.numRows; row += 1) {
      for (let col = 0; col < this.numCols; col += 1) {
        const currentCell = this.getGridPos(row, col);
        let currentCellStringValue = '[ ]';
        if (currentCell) {
          currentCellStringValue = (currentCell === 1) ? '[X]' : '[O]';
        }
        outputString = outputString.concat(currentCellStringValue);
      }
      outputString = outputString.concat('\n');
    }
    return outputString;
  }

  /**
   * Drop a piece into a column (Make a move).
   * @param {number} player The players ID.
   * @param {number} column The column they wish to drop into.
   * @returns {boolean} Is this move valid?
   */
  dropPiece(player, column) {
    for (let row = this.numRows - 1; row >= 0; row -= 1) {
      if (this.getGridPos(row, column) === 0) {
        this.setGridPos(row, column, player);
        return true;
      }
    }
    // Either the column is full or its not even in the range of cols on the board
    return false;
  }

  /**
   * @returns {boolean} array of arrays representing the board. All cells filled with 0
   */
  createBoard() {
    return Array(this.numRows).fill(0).map(() => Array(this.numCols).fill(0));
  }

  /**
   * Puts the given value into the grid at the given co-ordinates.
   * @param {number} row The row number
   * @param {number} col The col number
   * @param {number} value The value to enter
   * @returns {void}
   */
  setGridPos(row, col, value) {
    this.grid[row][col] = value;
  }

  /**
   * @param {number} row The row number
   * @param {number} col The column number
   * @returns {number} The cell value at the given co-ordinates
   */
  getGridPos(row, col) {
    return this.grid[row][col];
  }

  /**
   * @returns {boolean} whether or not there is a vertical winning line on the board.
   */
  isThereAVerticalWin() {
    for (let row = 0; row <= (this.numRows - 5); row += 1) {
      for (let col = 0; col < this.numCols; col += 1) {
        const currentVal = this.getGridPos(row, col);
        if (currentVal !== 0
          && currentVal === this.getGridPos(row + 1, col)
          && currentVal === this.getGridPos(row + 2, col)
          && currentVal === this.getGridPos(row + 3, col)
          && currentVal === this.getGridPos(row + 4, col)) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * @returns {boolean} whether or not there is a horizontal winning line on the board.
   */
  isThereAHorizontalWin() {
    for (let row = 0; row < this.numRows; row += 1) {
      for (let col = 0; col <= (this.numCols - 5); col += 1) {
        const currentVal = this.getGridPos(row, col);
        if (currentVal !== 0
          && currentVal === this.getGridPos(row, col + 1)
          && currentVal === this.getGridPos(row, col + 2)
          && currentVal === this.getGridPos(row, col + 3)
          && currentVal === this.getGridPos(row, col + 4)) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * @returns {boolean} whether there is a winning line that goes diagonally down to the right
   */
  isThereALeftDownToRightDiagonalWin() {
    for (let col = 0; col < this.numCols - 4; col += 1) {
      for (let row = 0; row < this.numRows - 4; row += 1) {
        const currentVal = this.getGridPos(row, col);
        if (currentVal !== 0
          && currentVal === this.getGridPos(row + 1, col + 1)
          && currentVal === this.getGridPos(row + 2, col + 2)
          && currentVal === this.getGridPos(row + 3, col + 3)
          && currentVal === this.getGridPos(row + 4, col + 4)) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * @returns {boolean} whether there is a winning line that goes diagonally up to the right
   */
  isThereARightDownToLeftDiagonalWin() {
    for (let col = this.numCols - 1; col > 3; col -= 1) {
      for (let row = 0; row < this.numRows - 4; row += 1) {
        const currentVal = this.getGridPos(row, col);
        if (currentVal !== 0
          && currentVal === this.getGridPos(row + 1, col - 1)
          && currentVal === this.getGridPos(row + 2, col - 2)
          && currentVal === this.getGridPos(row + 3, col - 3)
          && currentVal === this.getGridPos(row + 4, col - 4)) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * @returns {boolean} Is there a winner on the board?
   */
  isWinner() {
    if (this.isThereAHorizontalWin() || this.isThereAVerticalWin()
      || this.isThereALeftDownToRightDiagonalWin()
      || this.isThereARightDownToLeftDiagonalWin()) {
      return true;
    }
    return false;
  }

  /**
   * For testing.
   * @param {array} board A custom version of the board.
   * @returns {void}
   */
  setBoard(board) {
    this.grid = board;
  }

// TODO - isDraw()
}

module.exports = GameBoard;
