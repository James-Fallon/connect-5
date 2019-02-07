const express = require('express');

const app = express();
const server = app.listen(3000);
console.log('Starting server.....');
const io = require('socket.io')(server);

const GameBoard = require('./gameBoard.js');

const symbols = ['X', '0'];

const game = {
  players: [],
};

/**
 * @param {number} id The id of the player who just had their turn
 * @returns {string} The id of the player whos turn it is next
 */
function changeTurn(id) {
  if (id === 1) {
    return 2;
  }
  return 1;
}

io.on('connection', (socket) => {
  /**
   * This is called when a client enters the game. We assign them an ID and return it to them.
   * If we already have 2 players, emit an error back to the client.
   * @returns{void}
   */
  function registerNewPlayer() {
    if (game.players.length === 0) {
      // Player 1 joining
      console.log('Player 1 is in the game.');
      const id = 1;
      game.players.push(socket);
      socket.emit('playerRegistered', {
        id,
        symbol: symbols[id - 1],
        canStart: false,
      });
    } else if (game.players.length === 1) {
      // Second player joining
      console.log('Player 2 is in the game.');
      const id = 2;
      game.players.push(socket);

      // We can now start the game
      game.board = new GameBoard();

      socket.emit('playerRegistered', {
        id,
        symbol: symbols[id - 1],
        canStart: true,
        board: game.board.display(),
      });

      io.sockets.emit('tellClientToPlayTurn', {
        whosTurn: id,
        board: game.board.display(),
      });
    } else {
      console.log('A 3rd player tried connecting but the game was full.');
      socket.emit('maxPlayersError');
    }
  }

  /**
   * If a player disconnects we end the game (as in requirements)
   * @returns{void}
   */
  function handleDisconnect() {
    if (game.players.includes(socket)) {
      io.sockets.emit('gameOver', {
        reason: '\nGame over. Player disconnected.',
      });
      console.log('Player disconnected. Resetting game.');
      // This removes all players from the game.
      game.players.length = 0;
    }
  }


  /**
   * Make the specified move. If the move is valid, change turn and prompt the opponent.
   * If the move isn't valid, don't change the turn and ask the player to try again.
   * @param {Object} data The payload (from the client) containing the move
   * @returns{void}
   */
  function makeMoveAndChangeTurn(data) {
    const wasMoveValid = game.board.dropPiece(data.id, data.column);
    if (wasMoveValid) {
      // The move is valid. Print the new table back to the players.
      io.sockets.emit('boardUpdated', {
        board: game.board.display(),
        whoMadeTheMove: data.id,
      });
      if (game.board.isWinner()) {
        const winningMessage = `\nGame over. Player ${data.id} is the winner!!`;
        io.sockets.emit('gameOver', {
          reason: winningMessage,
        });
      } else {
        // We emit a message to other player with the updated board.
        socket.broadcast.emit('tellClientToPlayTurn', {
          board: game.board.display(),
          whosTurn: changeTurn(data.id),
        });
      }
    } else {
      socket.emit('illegalMove');
    }
  }

  socket.on('newPlayer', registerNewPlayer);
  socket.on('disconnect', handleDisconnect);
  socket.on('clientHasPlayedTheirTurn', makeMoveAndChangeTurn);
});
