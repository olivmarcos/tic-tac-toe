const gameBoard = (() => {
  const _board = document.querySelector("#gameBoard");
  const _boardArray = ["", "", "", "", "", "", "", "", ""];

  function render() {
    _boardArray.forEach((item) => {
      console.log(item);
      const _block = document.createElement("div");
      _block.classList.add("block");
      _block.innerHTML = "";
      _board.appendChild(_block);
    });
  }
  return { render };
})();

const Player = (name, value) => {
  function mark() {
    document.addEventListener("click", (e) => {
      if (!e.target.matches(".block")) return;
      e.target.innerHTML = value;
    });
  }

  return { name, value, mark };
};

gameBoard.render();

const player1 = Player("Marcos", "X");
player1.mark();
