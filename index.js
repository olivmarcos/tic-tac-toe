const gameBoard = (() => {
  const _board = document.querySelector("#gameBoard");
  let boardArray = [4, 9, 2, 3, 5, 7, 8, 1, 6];

  const render = () => {
    let count = 0;
    boardArray.forEach((item) => {
      const _block = document.createElement("div");
      _block.classList.add("block");
      _block.setAttribute('value', item);
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
        playerOneArr.push(parseInt(e.target.getAttribute('value')));

        if(_checkWin(playerOneArr)) {
          _congrastTheWinner(player1);
          return;
        }
        currentPlayer = 2;
      } else if (currentPlayer == 2 && e.target.innerHTML === "") {
        e.target.innerHTML = player2.sign;
        playerTwoArr.push(parseInt(e.target.getAttribute('value')));
        
        if(_checkWin(playerTwoArr)) {
          _congrastTheWinner(player2);
          return;
        }  
        currentPlayer = 1;
      }
    });
  };

  const _checkWin = (array) => {
    const add = (a , b) => a + b;
    const sum = array.reduce(add);
    
    return sum === 15;
  }

  const _congrastTheWinner = (player) => {
    const div = document.querySelector('.winner');
    const h1 = document.querySelector('.winner h1');
    div.style.visibility = 'visible'
    h1.innerHTML = `${player.name} won!`
  }

  const startGame = () => {
    _turn();
  };

  return { startGame };
})();

gameBoard.render();
game.startGame();
