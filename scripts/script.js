const game = playGame();

function playGame() {
  const board = createBoard();
  const player1 = createPlayer("player1", "X");
  const player2 = createPlayer("player2", "0");
  let currentPlayer = player1
  let gameFinished = false;

  function placeToken(row, column) {
    board.updateField(row, column, currentPlayer.token);
  }

  function updateCurrentPlayer () {
    currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;
  }

  function getGuess() {
    row = prompt(`${currentPlayer}, please enter the row in which you want to place your token. (row 0, 1, or 2)`);
    column = prompt(`${currentPlayer}, please enter the column in which you want to place your token. (column 0, 1, or 2)`);
    return [row, column];
  }

  function makeMove() {
    guess = getGuess();
    placeToken(guess[0], guess[1]);
    gameFinished = board.hasWinningPattern(currentPlayer);
    updateCurrentPlayer();
    board.print();
  }
  
  board.print();
  while(gameFinished === false) {
    makeMove();
  }
  
}



function createPlayer(name, token) {0
  this.name = name;
  this.token = token;
  return { name, token };
}

function createBoard() {
  let board = [[null, null, null],
               [null, null, null],
               [null, null, null]];
  
  const print = () => { console.log(board[0], board[1], board[2])};
  const updateField = (row, column, token) => {
    board[row][column] = token;
  };

  const hasWinningPattern = (player) => {
    if (hasHorizontalPattern(player.token) === true) {
      console.log(`${player.name} wins the game.`)
      return true;
    } else if (hasDiagonalPattern(player.token) === true) {
      console.log(`${player.name} wins the game.`)
      return true;
    } else if (hasVerticalPattern(player.token) === true) {
      console.log(`${player.name} wins the game.`)
      return true;
    }
    return false;
  }

  function hasVerticalPattern(token) {
    if (board[0][0] === token && board[1][0] === token && board[2][0] === token) {
      return true;
    } else if (board[0][1] === token && board[1][1] === token && board[2][1] === token) {
      return true;
    } else if (board[0][2] === token && board[1][2] === token && board[2][2] === token) {
      return true;
    }
    return false;0
  }

  function hasDiagonalPattern(token) {
    if (board[0][0] === token && board[1][1] === token && board[2][2] === token) {
      return true;
    } else if (board[0][2] === token && board[1][1] === token && board[2][0] === token) {
      return true;
    }
    return false;
  }

  function hasHorizontalPattern(token) {
    if(board[0].toString() === `${token},${token},${token}`) {
      return true;
    } else if(board[1].toString() === `${token},${token},${token}`) {
      return true;
    } else if(board[2].toString() === `${token},${token},${token}`) {
      return true;
    }
    return false;
  }
  return { print, updateField, hasWinningPattern };
}




