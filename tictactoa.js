
    // Gameboard module
    const gameBoard = (() => {
      const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];

      const getBoard = () => board;

      const chooseNow = (row, col, value) => {
        if (board[row][col] === '') {
          board[row][col] = value;
          return true; // 
        }
        return false; 
      };

      const resetBoard = () => {
        for (let row = 0; row < board.length; row++) {
          for (let col = 0; col < board[row].length; col++) {
            board[row][col] = '';
          }
        }
      };

      return { getBoard, chooseNow, resetBoard };
    })();

    //players
    const userPlayer = (name, effect) => {
      return { name, effect };
    };

    // Game control module
    const gameController = (() => {
      let currentPlayer;
      let gameOver = false;

      const players = [userPlayer('Player 1', 'X'), userPlayer('Player 2', 'O')];

      const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
      };

      const getCurrentPlayer = () => currentPlayer;

      const isGameOver = () => gameOver;

      const checkWin = () => {
        const board = gameBoard.getBoard();

         // Check rows for a win
    for (let row = 0; row < 3; row++) {
      if (board[row][0] !== '' && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
        return true;
      }
    }

    //Check columns for a win
    for (let col = 0; col < 3; col++) {
      if (board[0][col] !== '' && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
        return true;
      }
    }

    // Check diagonals for a win
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return true;
    }
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return true;
    }

    return false;
  
        
      };

      const checkDraw = () => {
        const board = gameBoard.getBoard();

        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            if (board[row][col] === '') {
              return false; 
            }
          }
        }
    
        return true; 
      };
    
      

      const choosenowUpdate = (row, col) => {
        if (gameOver) return;

        const currentPlayer = getCurrentPlayer();
        const updated = gameBoard.chooseNow(row, col, currentPlayer.effect);

        if (updated) {
          document.getElementById('dashboard').rows[row].cells[col].textContent = currentPlayer.effect;

          if (checkWin()) {
            document.getElementById('result').textContent = `${currentPlayer.name} wins!`;
            gameOver = true;
          } else if (checkDraw()) {
            document.getElementById('result').textContent = "It's a draw!";
            gameOver = true;
          } else {
            switchPlayer();
            document.getElementById('turn').textContent = `${currentPlayer.name}'s turn (${currentPlayer.effect})`;
          }
        } else {
         console.log('taken already')
        }
      };

      const startGame = () => {
        currentPlayer = players[0];
        gameOver = false;
        gameBoard.resetBoard();
        document.getElementById('result').textContent = '';
        document.getElementById('turn').textContent = `${currentPlayer.name}'s turn (${currentPlayer.effect})`;
      };

      return { startGame, choosenowUpdate, getCurrentPlayer, isGameOver };
    })();

   
    gameController.startGame();
    const initGameBoard = () => {
      const cells = document.querySelectorAll('#dashboard td');
      cells.forEach((cell, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        cell.onclick = () => gameController.choosenowUpdate (row, col);
      });
    };

    // Start the game when the page loads
    gameController.startGame();
    initGameBoard();

   