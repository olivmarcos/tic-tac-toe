const gameBoard = (() => {
  const _board = document.querySelector("#gameBoard");
  const _boradArray = ["", "", "", "", "", "", "", "", ""];

  function render() {
      let i = 0;
    _boradArray.forEach((item) => {
      console.log(item);
      const _block = document.createElement("div");
      _block.classList.add("block");
      _block.innerHTML = i;
      _board.appendChild(_block);
      i++;
    });
  }

  return { render };
})();

gameBoard.render();
