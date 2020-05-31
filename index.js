const gameBoard = (() => {
  const _board = document.querySelector("#gameBoard");
  const _boardArray = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    _boardArray.forEach((item) => {
      const _block = document.createElement("div");
      _block.classList.add("block");
      _board.appendChild(_block);
    });
  };

  return { render };
})();

const Player = (name, sign) => {
  return { name, sign };
};

const game = (() => {
  const player1 = Player("Player1", "X");
  const player2 = Player("Player1", "O");

  const _turn = () => {
    let currentPlayer = 1;

    document.addEventListener("click", (e) => {
      if (!e.target.matches(".block")) return;
      if (currentPlayer == 1 && e.target.innerHTML === "") {
        e.target.innerHTML = player1.sign;
        currentPlayer = 2;
      } else if (currentPlayer == 2 && e.target.innerHTML === "") {
        e.target.innerHTML = player2.sign;
        currentPlayer = 1;
      }      
    });
  };

  const startGame = () => {
    _turn();
  };

  return { startGame };
})();

gameBoard.render();
game.startGame();
