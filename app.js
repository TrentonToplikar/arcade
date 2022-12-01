/* *******Set State********* */
let state = {};

const resetState = () => {
  state.board = 
  [null, null, null, null, null, null,null, null, null];
  state.winner = null;
  state.getCurrentPlayer = () => state.players[state.currentPlayerIdx];
  state.players = ['', ''];
  state.currentPlayerIdx = 0;
};

// *************** DOM SELECTORS ***************
const boardElem = document.querySelector('#board');
const playerTurnElem = document.querySelector('#player-turn');
const cellElem = document.querySelector('.cell')
console.log(cellElem)
const restartBtn = document.querySelector('#restartBtn');
let currentPlayer = "X";
let count = 0;
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 9],
];

// Helper function
const checkBoard = () => {
  for (let i = 0; i < state.board.length; i++) {
    const card = state.board[i];
    if (!card.owner) return;
  }
  state.winner = getWinner();
};

const getWinner = () => {
  // let player1Score = state.scores[0];
  // let player2Score = state.scores[1];
  // let winnerIdx = player1Score > player2Score ? 0 : 1;
  // return state.players[winnerIdx];
};

// *************** DOM MANIPULATION FUNCTIONS ***************
const renderBoard = () => {
    // make sure the board is clear.
    boardElem.innerHTML = ''; //not ideal
    // iterate through the state.board
    for (let i = 0; i < state.board.length; i++) {
      // create elements
      const cellElem = document.createElement('div');
      cellElem.classList.add('cell');
      cellElem.setAttribute('id', `${i}`)
      // append them to the parent element
      boardElem.appendChild(cellElem);
    }
  };
  
// *************** EVENT LISTENERS ***************
let gameboard = document.querySelector(".board");

/* ******** CREATE INPUT FOR USERS ************ */
const renderPlayer = () => {
  let text;
  // have text to display current player
  // conditionally render players
  // if there are no players we want to display an input
  if (!state.players[0] || !state.players[1]) {
    text = `
    <input name="player1" placeholder="Enter Player 1">
    <input name="player2" placeholder="Enter Player 2">
    <button class="start">Start Game</button>
    `;
  } else {
    // if we do have players
    if (count % 2 === 0) {
      text = `It's currently <span class='player'>${state.getCurrentPlayer()}</span>'s turn. OR >`;
   } else {
      text = `It's currently <span class='player'>${state.getCurrentPlayer()}</span>'s turn. OR >`;
    }
  }
  playerTurnElem.innerHTML = text;
}

/* ***********Change currentPlayer ***************** */
const changeCurrentPlayer = () => {
let text;
 if  (state.currentPlayerIdx === state.winner) {
  text = `It's currently <span class='player'>${state.getCurrentPlayer()}</span>'s turn.`
  const resetButton = document.createElement('button');
    resetButton.innerHTML = `Restart Game`;
    resetButton.classList.add('restart');
    playerTurnElem.appendChild(resetButton);
 } else {
  text = `It's currently <span class='player'>${state.getCurrentPlayer()}</span>'s turn.`
    const resetButton = document.createElement('button');
    resetButton.innerHTML = `Restart Game`;
    resetButton.classList.add('restart');
    playerTurnElem.appendChild(resetButton);
 }
}

/* ********************** Reset game ******************** */
  const render = () => {
    renderBoard();
    renderPlayer();
    changeCurrentPlayer();
    console.log(state);
  };

// Chooses X or O
function playGame(event, id) {
  event.stopPropagation();
  const clickedCell = event.target.id;
  state.board[id] = currentPlayer;
  console.log(clickedCell)
  // only allows to put an x or an o in an empty str
  if (event.target.innerHTML === "") {
    // changes the innerHTML based of this terany statment
    event.target.innerHTML = currentPlayer;
    event.target.style.background = count % 2 === 0 ? "#154257" : "#36ACE3";
    //fills in our object with an X or O
    state.board[clickedCell] = currentPlayer
    if (count % 2 === 0) {
      currentPlayer = "O"
    } else {
      currentPlayer = "X"
    }
    count++;
    // winCondition();
    console.log('clicked')
  } 
}

/* **********CHECK WINNER ********** */
function winCondition() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
      const condition = winConditions[i];
      const cellA = options[condition[0]];
      const cellB = options[condition[1]];
      const cellC = options[condition[2]];

      if (cellA == "" || cellB == "" || cellC == ""){
          continue;
      }
      if (cellA == cellB && cellB ==cellC){
          roundWon = true;
          break;
      }
  }

  if (roundWon) {
      statusText.textContent = `${currentPlayer} wins!`
      running = false;
  }
  else if (!options.includes("")) {
      statusText.textContent = 'Draw';
      running = false;
  }
  else {
      changePlayer();
  }
}

// // Call EventListener to make "X" or "O"
gameboard.addEventListener("click", playGame);

/* *************** CHANGE PLAYRES ************** */
playerTurnElem.addEventListener('click', (event) => {
  console.log('this is the event from playerTurnElem', event.target);
  if (event.target.className === 'restart') {
    resetState();
    render();
  } else if (event.target.className === 'start') {
    // get the input of player1
    const player1Input = document.querySelector('input[name=player1]');
    // get the value from the input
    const player1Value = player1Input.value;
    state.players[0] = player1Value;
    //  Do the same thing for player2
    const player2Input = document.querySelector('input[name=player2]');
    // get the value from the input
    const player2Value = player2Input.value;
    state.players[1] = player2Value;
    render();
  }
});

  // *************** BOOTSTRAPPING ***************
resetState();
render();




