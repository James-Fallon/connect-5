/* eslint-disable */
var expect = require('chai').expect;
var GameBoard = require('../gameBoard.js');
gameBoard = new GameBoard();

describe('isThereAHorizontalWin()', function () {
  it('should return whether there is a horizontal win', function () {

    let board = [[0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,1,1,1,1,1,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0]];

    gameBoard.setBoard(board);
    var result = gameBoard.isThereAHorizontalWin();

    expect(result).to.be.equal(true);

  });
});

describe('isThereAVerticalWin()', function () {
  it('should return whether there is a vertical win', function () {

    let board = [[0,0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0,2],
                 [0,0,0,0,0,0,0,0,2],
                 [0,0,0,0,0,0,0,0,2],
                 [0,0,0,0,0,0,0,0,2],
                 [0,0,0,0,0,0,0,0,2]];

    gameBoard.setBoard(board);
    var result = gameBoard.isThereAVerticalWin();

    expect(result).to.be.equal(true);

  });
});

describe('isThereALeftDownToRightDiagonalWin()', function () {
  it('should return whether there is a diagonal win (from left down to the right)', function () {

    let board = [[0,0,0,0,0,0,0,0,0],
                 [0,1,0,0,0,0,0,0,0],
                 [0,0,1,0,0,0,0,0,0],
                 [0,0,0,1,0,0,0,0,0],
                 [0,0,0,0,1,0,0,0,0],
                 [0,0,0,0,0,1,0,0,0]];

    gameBoard.setBoard(board);
    var result = gameBoard.isThereALeftDownToRightDiagonalWin();

    expect(result).to.be.equal(true);

  });
});

describe('isThereARightDownToLeftDiagonalWin()', function () {
  it('should return whether there is a diagonal win (from right down to the left)', function () {

    let board = [[0,0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,2,0],
                 [0,0,0,0,0,0,2,0,0],
                 [0,0,0,0,0,2,0,0,0],
                 [0,0,0,0,2,0,0,0,0],
                 [0,0,0,2,0,0,0,0,0]];

    gameBoard.setBoard(board);
    var result = gameBoard.isThereARightDownToLeftDiagonalWin();

    expect(result).to.be.equal(true);

  });
});

describe('isWinner()', function () {
  it('should return false if there is no winner', function () {

    let board = [[0,0,0,0,0,0,0,0,0],
                 [0,0,1,0,0,0,0,0,0],
                 [2,0,1,0,0,0,2,1,0],
                 [1,1,1,2,0,2,2,1,0],
                 [1,2,2,1,2,1,2,1,0],
                 [1,1,1,2,2,1,1,1,2]];

    gameBoard.setBoard(board);
    var result = gameBoard.isWinner();

    expect(result).to.be.equal(false);

  });
});

describe('getPrintableVersionOfBoard()', function () {
  it('should return the board in the format the player will see', function () {

    let board = [[0,0,0,0,0,0,0,0,0],
                 [0,0,1,0,0,0,0,2,0],
                 [2,0,1,0,0,0,2,1,0],
                 [1,1,1,2,0,2,2,1,0],
                 [1,2,2,1,2,1,2,1,0],
                 [1,1,1,2,2,1,1,1,2]];
    gameBoard.setBoard(board);
    let expectedResult = '[ ][ ][ ][ ][ ][ ][ ][ ][ ]\n' +
                         '[ ][ ][X][ ][ ][ ][ ][O][ ]\n' +
                         '[O][ ][X][ ][ ][ ][O][X][ ]\n' +
                         '[X][X][X][O][ ][O][O][X][ ]\n' +
                         '[X][O][O][X][O][X][O][X][ ]\n' +
                         '[X][X][X][O][O][X][X][X][O]\n';


    var result = gameBoard.display();

    expect(result).to.be.equal(expectedResult);

  });
});
