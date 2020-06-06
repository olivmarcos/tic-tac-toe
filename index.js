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
  let currentPlayer = 1;
  let count = 0;

  let playerOneArr = [];
  let playerTwoArr = [];

  let playerOneWon = false;
  let playerTwoWon = false;

  let playerOneCount = 0;
  let playerTwoCount = 0;

  let scores = document.querySelectorAll(".score");
  scores[0].innerHTML = `Score: ${playerOneCount}`;
  scores[1].innerHTML = `Score: ${playerTwoCount}`;

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
    document.addEventListener("click", (e) => {
      if (!e.target.matches(".block")) return;

      if (currentPlayer == 1 && e.target.innerHTML === "") {
        count++;
        e.target.innerHTML = _setPlayersName().player1.sign;
        playerOneArr.push(parseInt(e.target.getAttribute("value")));

        if (_checkWin(playerOneArr)) {
          _congrastTheWinner(_setPlayersName().player1);
          scores[0].innerHTML = `Score: ${(playerOneCount += 1)}`;
          playerOneWon = true;
        }

        currentPlayer = 2;
      } else if (currentPlayer == 2 && e.target.innerHTML === "") {
        count++;
        e.target.innerHTML = _setPlayersName().player2.sign;
        playerTwoArr.push(parseInt(e.target.getAttribute("value")));

        if (_checkWin(playerTwoArr)) {
          _congrastTheWinner(_setPlayersName().player2);
          scores[1].innerHTML = `Score: ${(playerTwoCount += 1)}`;
          playerTwoWon = true;
        }
        currentPlayer = 1;
      }
      if (!playerOneWon && !playerTwoWon && count == 9) _announceTie();
    });
  };

  let _checkWin = (arr) =>
    winConditions.some((array) => array.every((e) => arr.includes(e)));

  const _congrastTheWinner = (player) => {
    const div = document.querySelector(".winner");
    const h1 = document.querySelector(".winner h1");
    const gameBoard = document.querySelector("#gameBoard");
    gameBoard.classList.add("noClick");
    div.style.visibility = "visible";
    h1.innerHTML = `${player.name} won!`;
  };

  const _announceTie = () => {
    const div = document.querySelector(".winner");
    const h1 = document.querySelector(".winner h1");
    div.style.visibility = "visible";
    h1.innerHTML = `It's a tie!`;
  };

  const resetGame = () => {
    const buttons = document.querySelectorAll(".reset");

    const _setInvisible = () => {
      const winnerDiv = document.querySelector(".winner");
      winnerDiv.style.visibility = "hidden";
    };

    const _setBoardClean = () => {
      let blocks = document.querySelectorAll(".block");
      blocks.forEach((item) => {
        item.innerHTML = "";
      });
    };

    const _setPlayersClean = () => {
      playerOneArr = [];
      playerTwoArr = [];
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const gameBoard = document.querySelector("#gameBoard");
        gameBoard.classList.remove("noClick");
        _setInvisible();
        _setBoardClean();
        _setPlayersClean();
        currentPlayer = 1;
        count = 0;
        playerOneWon = false;
        playerTwoWon = false;
        if (button.innerHTML === "restart") {
  scores[0].innerHTML = `Score: ${playerOneCount = 0}`;
  scores[1].innerHTML = `Score: ${playerTwoCount = 0}`;
        }
      });
    });
  };

  const startGame = () => {
    const startButton = document.querySelector(".start button");
    startButton.addEventListener("click", () => {
      const divStart = document.querySelector(".start");
      const board = document.querySelector(".board");
      const displays = document.querySelector("#displays");
      divStart.style.visibility = "hidden";
      board.style.visibility = "visible";
      displays.style.visibility = "visible";
      _setPlayersName();
      _turn();
      resetGame();
      _setDisplay();
    });
  };

  const _setPlayersName = () => {
    const players = document.querySelectorAll(".playersName input");
    const player1 = Player(
      !players[0].value ? "Player 1" : players[0].value,
      "X"
    );
    const player2 = Player(
      !players[1].value ? "Player 2" : players[1].value,
      "O"
    );

    return { player1, player2 };
  };

  const _setDisplay = () => {
    const names = document.querySelectorAll(".name");
    names[0].innerHTML = _setPlayersName().player1.name
      ? _setPlayersName().player1.name
      : "Player 1";
    names[1].innerHTML = _setPlayersName().player2.name
      ? _setPlayersName().player2.name
      : "Player 2";
  };

  return { startGame };
})();

gameBoard.render();
game.startGame();
