const io = require('socket.io-client');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


let id = 0;
let name = '';

(function run() {
  const socket = io.connect('http://localhost:3000');

  rl.question('Enter your name: ', (answer) => {
    name = answer;
    socket.emit('newPlayer', { name: answer });
  });

  /**
   * This method prints the player's details after a successful registration to the game.
   * @param {Object} data Info on this player's details (from server)
   * @returns{void}
   */
  function printUserDetails(data) {
    ({ id } = data);
    const { symbol } = data;
    console.log('--------------------------------------');
    console.log(`Welcome to Connect5 ${name}!\nYou are player ${id}. Your symbol is ${symbol}`);
    console.log('--------------------------------------\n');

    if (data.canStart) {
      console.log('Game starting....');
      console.log('--------------------------------------');
      console.log(data.board);
      console.log('--------------------------------------\n');
    } else {
      console.log('Waiting for opponent to join game....');
    }
  }

  /**
   * This method asks the user for their move and sends it to the server.
   * @param {Object} data Info on this player's details (from server)
   * @returns{void}
   */
  function playTurn(data) {
    // console.log(data.board);
    // Its our go
    if (data.whosTurn === id) {
      rl.question(`It's your turn ${name}, please enter column (1-9): `, (answer) => {
        // The arrays are indexed from 0
        const column = parseInt(answer, 10) - 1;
        socket.emit('clientHasPlayedTheirTurn', {
          id,
          column,
        });
      });
    } else {
      console.log('Waiting for opponent to make a move....');
    }
  }

  /**
   * Show the updated board after someone has made a move.
   * @param {Object} data printable version of board + who made the latest move
   * @returns{void}
   */
  function showUpdatedBoard(data) {
    console.log('--------------------------------------\n');
    console.log(data.board);
    console.log('--------------------------------------\n');
    if (data.whoMadeTheMove === id) {
      console.log('Wait for opponent to make a move...');
    }
  }

  /**
   * If the move was illegal, tell the player and ask them to try again.
   * @returns{void}
   */
  function dealWithIllegalMove() {
    rl.question('That move is illegal. Please try again (1-9): ', (answer) => {
      // The arrays are indexed from 0
      const column = parseInt(answer, 10) - 1;
      socket.emit('clientHasPlayedTheirTurn', {
        id,
        column,
      });
      console.log('\nMove made. Now waiting for opponent....');
    });
  }

  socket.on('playerRegistered', printUserDetails);
  socket.on('boardUpdated', showUpdatedBoard);
  socket.on('tellClientToPlayTurn', playTurn);
  socket.on('illegalMove', dealWithIllegalMove);
  socket.on('gameOver', (data) => {
    console.log(data.reason);
  });
  socket.on('maxPlayersError', () => {
    console.log('Sorry, the game is already full.');
    process.exit(-1);
  });
}());
