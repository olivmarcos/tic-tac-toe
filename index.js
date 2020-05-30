const gameBoard = (() => {
  const _board = document.querySelector("#gameBoard");
  const _boardArray = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    _boardArray.forEach((item) => {
      console.log(item);
      const _block = document.createElement("div");
      _block.classList.add("block");
      _block.innerHTML = "";
      _board.appendChild(_block);
    });
  };
  return { render };
})();

const Player = (name, sign) => {
  const mark = () => {
    document.addEventListener("click", (e) => {
      if (!e.target.matches(".block")) return;
      e.target.innerHTML = sign;
    });
  };
  return { name, sign, mark };
};

const game = (() => {
  const player1 = Player("Player1", "X");
  const player2 = Player("Player1", "O");

  let currentPlayer = 1;
  player1.mark();
})();

gameBoard.render();
