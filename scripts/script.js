const screenController = (function() {
  const startButton = document.querySelector(".js-start-button");
  let game;
  let domBoard = document.querySelector(".js-board");
  const info = document.querySelector(".js-info");


  startButton.addEventListener("click", () => { 
    startButton.innerHTML = "New Game";
    game = createGame();
    game.start(printDomBoard);
    addDomBoardEventListeners();
    info.innerHTML = `Player 1 can click a field of his/her choice to place the token.`;
  })

  function printDomBoard(fields) {
    domBoard.innerHTML = null;
    fields.forEach((row, row_index) => {
      row.forEach((field, column_index) => {
        let token;
        field === null ? token = " " : token = field;

        fieldIndexes = [row_index, column_index];

        domBoard.innerHTML += `<div class="cell js-cells" data-field=${fieldIndexes}>${token}</div>`;
      })
    })
  }

  function addDomBoardEventListeners() {
    const cells = document.querySelectorAll(".js-cells");
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        let fieldIndexes = cell.dataset.field.split(",").map(Number);

        game.finished = game.makeMove(fieldIndexes, info, printDomBoard);

        if(!game.finished) { addDomBoardEventListeners(); }
      });
    })
  }
})();

function createGame() {
  let board;
  let player1;
  let player2;
  let currentPlayer;
  let finished = false;

  function start (printDomBoard) {
    board = createBoard();
    fields = board.getFields();
    printDomBoard(fields);

    let playerInformation = getPlayerInformation();
    player1 = createPlayer(playerInformation[0], playerInformation[1]);
    playerInformation = getPlayerInformation();
    player2 = createPlayer(playerInformation[0], playerInformation[1]);
    currentPlayer = player1;
  }

  function getPlayerInformation() {
    let playerName = prompt("Please enter the name of Player1:");
    let playerToken = prompt(`${playerName}, please chose your token (usually X or O):`);
    return [ playerName, playerToken ];
  }

  function placeToken(row, column) {
    board.updateField(row, column, currentPlayer.token);
  }

  function updateCurrentPlayer () {
    currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;
  }

  function isValid(choice) {
    return board.isFieldEmpty(choice[0], choice[1]);
  }

  function makeMove(choice, info, printDomBoard) {
    if (isValid(choice)) {
      placeToken(choice[0], choice[1]);
      fields = board.getFields();
      printDomBoard(fields);

      if(board.hasWinningPattern(currentPlayer)) {
        info.innerHTML =`${currentPlayer.name} wins the game.`;
        finished = true;       
      } else if (!board.hasEmptyField()) {
        info.innerHTML ="No more empty fields. The game has finished with a tie.";
        finished = true; 
      } else {
        updateCurrentPlayer();
        info.innerHTML =`${currentPlayer.name}, please make your choice.`;
      } 
    } else {
      info.innerHTML = `This field is already taken. Please chose another field.`;
    }
    return finished
  }
  return { start, makeMove, finished };
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
    return fields.flat().includes(null);
  }

  const hasWinningPattern = (player) => {
    if (hasHorizontalPattern(player.token)  || hasDiagonalPattern(player.token) || hasVerticalPattern(player.token)) {
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




