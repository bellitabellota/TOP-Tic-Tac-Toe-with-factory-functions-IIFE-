const game = playGame();

function playGame() {
  const board = createBoard();
  const player1 = createPlayer("player1", "X");
  const player2 = createPlayer("player2", "0");
  let currentPlayer = player1

  function placeToken(row, column) {
    board.updateField(row, column, currentPlayer.token);
  }

  board.print();
  placeToken(1, 1);
  board.print();
}



function createPlayer(name, token) {
  this.name = name;
  this.token = token;
  return { name, token };
}

function createBoard() {
  let board = [[null, null, null],
               [null, null, null],
               [null, null, null]];
  
  const print = () => { console.log(board)};
  const updateField = (row, column, token) => {
    board[row][column] = token;
  };

  return { print, updateField };
}




