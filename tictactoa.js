  // JavaScript code (same as previous example)

    // Gameboard module
    const gameBoard = (() => {
      const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];

      const getBoard = () => board;

      const updateCell = (row, col, value) => {
        if (board[row][col] === '') {
          board[row][col] = value;
          return true; // Cell was updated successfully
        }
        return false; // Cell was already occupied
      };

      const resetBoard = () => {
        for (let row = 0; row < board.length; row++) {
          for (let col = 0; col < board[row].length; col++) {
            board[row][col] = '';
          }
        }
      };

      return { getBoard, updateCell, resetBoard };
    })();

    // Player factory
    const createPlayer = (name, marker) => {
      return { name, marker };
    };

    // Game control module
    const gameController = (() => {
      let currentPlayer;
      let gameOver = false;

      const players = [createPlayer('Player 1', 'X'), createPlayer('Player 2', 'O')];

      const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
      };

      const getCurrentPlayer = () => currentPlayer;

      const isGameOver = () => gameOver;

      const checkWin = () => {
        const board = gameBoard.getBoard();

        // Check rows, columns, and diagonals for a win
        // (implement your winning condition logic here)

        return false;
      };

      const checkDraw = () => {
        const board = gameBoard.getBoard();

        // Check if the board is full and there is no winner
        // (implement your draw condition logic here)

        return false;
      };

      const handleCellClick = (row, col) => {
        if (gameOver) return;

        const currentPlayer = getCurrentPlayer();
        const updated = gameBoard.updateCell(row, col, currentPlayer.marker);

        if (updated) {
          document.getElementById('dashboard').rows[row].cells[col].textContent = currentPlayer.marker;

          if (checkWin()) {
            document.getElementById('result').textContent = `${currentPlayer.name} wins!`;
            gameOver = true;
          } else if (checkDraw()) {
            document.getElementById('result').textContent = "It's a draw!";
            gameOver = true;
          } else {
            switchPlayer();
            document.getElementById('turn').textContent = `${currentPlayer.name}'s turn (${currentPlayer.marker})`;
          }
        } else {
          console.log('Cell already occupied!');
        }
      };

      const startGame = () => {
        currentPlayer = players[0];
        gameOver = false;
        gameBoard.resetBoard();
        document.getElementById('result').textContent = '';
        document.getElementById('turn').textContent = `${currentPlayer.name}'s turn (${currentPlayer.marker})`;
      };

      return { startGame, handleCellClick, getCurrentPlayer, isGameOver };
    })();

    // Start the game when the page loads
    gameController.startGame();
    const initGameBoard = () => {
      const cells = document.querySelectorAll('#dashboard td');
      cells.forEach((cell, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        cell.onclick = () => gameController.handleCellClick (row, col);
      });
    };

    // Start the game when the page loads
    gameController.startGame();
    initGameBoard();

   