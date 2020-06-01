const gameBoard = (() => {
  const _board = document.querySelector("#gameBoard");
  let boardArray = [4, 9, 2, 3, 5, 7, 8, 1, 6];

  const render = () => {
    let count = 0;
    boardArray.forEach(() => {
      const _block = document.createElement("div");
      _block.classList.add("block");
      _block.setAttribute('value', count);
      _board.appendChild(_block);
      count++;
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

  const _turn = () => {
    let currentPlayer = 1;
    let playerOneArr = [];
    let playerTwoArr = []

    document.addEventListener("click", (e) => {
      if (!e.target.matches(".block")) return;

      if (currentPlayer == 1 && e.target.innerHTML === "") {
        e.target.innerHTML = player1.sign;
        playerOneArr.push(gameBoard.boardArray[e.target.getAttribute('value')]);
        if(_checkWin(playerOneArr)) console.log(`${player1.name} is the winner!`);
        currentPlayer = 2;
      } else if (currentPlayer == 2 && e.target.innerHTML === "") {
        e.target.innerHTML = player2.sign;
        playerTwoArr.push(gameBoard.boardArray[e.target.getAttribute('value')]);        
        currentPlayer = 1;
        if(_checkWin(playerTwoArr)) console.log(`${player2.name} is the winner!`);
      }
    });
  };

  const _checkWin = (array) => {
    const add = (a , b) => a + b;
    const sum = array.reduce(add);
    
    return sum === 15;
  }

  const startGame = () => {
    _turn();
  };

  return { startGame };
})();

gameBoard.render();
game.startGame();
