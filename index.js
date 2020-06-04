const gameBoard = (() => {
  const _board = document.querySelector("#gameBoard");
  let boardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const render = () => {
    boardArray.forEach((item) => {
      const _block = document.createElement("div");
      _block.classList.add("block");
      _block.setAttribute("value", item);
      _board.appendChild(_block);
    });
  };

  return { render, boardArray };
})();

const Player = (name, sign) => {
  return { name, sign };
};

const game = (() => {
  const player1 = Player("Player1", "X");
  const player2 = Player("Player2", "O");

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  const _turn = () => {
    let currentPlayer = 1;
    let playerOneArr = [];
    let playerTwoArr = [];
    let playerOneWon = false;
    let playerTwoWon = false;
    let count = 0;

    document.addEventListener("click", (e) => {
      if (!e.target.matches(".block")) return;

      if (currentPlayer == 1 && e.target.innerHTML === "") {
        e.target.innerHTML = player1.sign;
        playerOneArr.push(parseInt(e.target.getAttribute("value")));

        if (_checkWin(playerOneArr)) {
          _congrastTheWinner(player1);
          playerOneWon = true;
        }

        currentPlayer = 2;
      } else if (currentPlayer == 2 && e.target.innerHTML === "") {
        e.target.innerHTML = player2.sign;
        playerTwoArr.push(parseInt(e.target.getAttribute("value")));

        if (_checkWin(playerTwoArr)) {
          _congrastTheWinner(player2);
          playerTwoWon = true;
        }
        currentPlayer = 1;
      }
      count++;
      if (!playerOneWon && !playerTwoWon && count == 9) _announceTie();
    });
  };

  let _checkWin = (arr) =>
  winConditions.some((array) => array.every((e) => arr.includes(e)));

  const _congrastTheWinner = (player) => {
    const div = document.querySelector(".winner");
    const h1 = document.querySelector(".winner h1");
    div.style.visibility = "visible";
    h1.innerHTML = `${player.name} won!`;
  };

  const _announceTie = () => {
    const div = document.querySelector(".winner");
    const h1 = document.querySelector(".winner h1");
    div.style.visibility = "visible";
    h1.innerHTML = `It's a tie!`;
  };

  const startGame = () => {
    _turn();
  };

  return { startGame };
})();

gameBoard.render();
game.startGame();
