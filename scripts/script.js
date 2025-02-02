ScreenController();

function ScreenController() {
  const startButton = document.querySelector(".js-start-button");
  let game;
  const domBoard = document.querySelector(".js-board");
  const info = document.querySelector(".js-info");


  startButton.addEventListener("click", () => { 
    game = createGame();
    game.start(printDomBoard);
    addDomBoardEventListeners();
    info.innerHTML = `Player 1 can click a field of his/her choice to place the token.`;
  })

  function printDomBoard(fields) {
    //console.log(fields);

    fields.forEach((row, row_index) => {
      row.forEach((field, column_index) => {

        fieldIndexes = [row_index, column_index]
        //console.log([row_index, column_index]);
        domBoard.innerHTML += `<div class="cell js-cells" data-field=${fieldIndexes}> </div>`
      })
    })
  }

  function addDomBoardEventListeners() {
    const cells = document.querySelectorAll(".js-cells");
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        let fieldIndexes = cell.dataset.field.split(",").map(Number);
        console.log(fieldIndexes);
      });
    })
  }
}

function createGame() {
  let board;
  let player1;
  let player2;
  let currentPlayer;
  let gameFinished = false;

  function start (printDomBoard) {
    board = createBoard();
    fields = board.getFields();
    printDomBoard(fields);

    //let playerInformation = getPlayerInformation();
    //player1 = createPlayer(playerInformation[0], playerInformation[1]);
    //playerInformation = getPlayerInformation();
    //player2 = createPlayer(playerInformation[0], playerInformation[1]);
    player1 = createPlayer("player1", "X");
    player2 = createPlayer("player2", "O");
    currentPlayer = player1;
  }

  function getPlayerInformation() {
    let playerName = prompt("Please enter the name of Player1:")
    let playerToken = prompt(`${playerName}, please chose your token (usually X or O):`)
    return [ playerName, playerToken ];
  }

  function placeToken(row, column) {
    board.updateField(row, column, currentPlayer.token);
  }

  function updateCurrentPlayer () {
    currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;
  }

  function getChoice() {
    const row = prompt(`${currentPlayer}, please enter the row in which you want to place your token. (row 0, 1, or 2)`);
    const column = prompt(`${currentPlayer}, please enter the column in which you want to place your token. (column 0, 1, or 2)`);

    if(board.isFieldEmpty(row, column)) {
      return [row, column];
    }

    console.log("Field already taken. Please choose another field.")
    return getChoice();
  }

  function makeMove() {
    const choice = getChoice();
    placeToken(choice[0], choice[1]);
    gameFinished = board.hasWinningPattern(currentPlayer) || !board.hasEmptyField();

    updateCurrentPlayer();
    board.print();
  }

  function play() {
    board.print();
    // while(gameFinished === false) {
    //   makeMove();
    // }
  }

  return { start }
}



function createPlayer(name, token) {
  this.name = name;
  this.token = token;
  return { name, token };
}

function createBoard() {
  let fields = [[null, null, null],
               [null, null, null],
               [null, null, null]];
  
  const print = () => { console.log(fields[0], fields[1], fields[2])};

  const updateField = (row, column, token) => {
    fields[row][column] = token;
  };

  const getFields = () => {
    return fields;
  }

  const isFieldEmpty = (row, column) => {
    return fields[row][column] === null;
  }

  const hasEmptyField = () => { 
    if(fields.flat().includes(null)) {
      return true;
    } else {
      console.log("No more empty fields. The game has finished with a tie.")
      return false;
    }
  }

  const hasWinningPattern = (player) => {
    if (hasHorizontalPattern(player.token)  || hasDiagonalPattern(player.token) || hasVerticalPattern(player.token)) {
      console.log(`${player.name} wins the game.`)
      return true;
    }
    return false;
  }

  function hasVerticalPattern(token) {
    if (fields[0][0] === token && fields[1][0] === token && fields[2][0] === token) {
      return true;
    } else if (fields[0][1] === token && fields[1][1] === token && fields[2][1] === token) {
      return true;
    } else if (fields[0][2] === token && fields[1][2] === token && fields[2][2] === token) {
      return true;
    }
    return false;
  }

  function hasDiagonalPattern(token) {
    if (fields[0][0] === token && fields[1][1] === token && fields[2][2] === token) {
      return true;
    } else if (fields[0][2] === token && fields[1][1] === token && fields[2][0] === token) {
      return true;
    }
    return false;
  }

  function hasHorizontalPattern(token) {
    if(fields[0].toString() === `${token},${token},${token}`) {
      return true;
    } else if(fields[1].toString() === `${token},${token},${token}`) {
      return true;
    } else if(fields[2].toString() === `${token},${token},${token}`) {
      return true;
    }
    return false;
  }
  return { print, updateField, getFields, hasWinningPattern, hasEmptyField, isFieldEmpty };
}




