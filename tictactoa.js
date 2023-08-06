
const gameBoard = (() => {
    const board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
  
    const getBoard = () => board;
  
    const chooseNow = (row, col, value) => {
        const statCell=gameBoard.board[row][col];
      if (statCell === '') {
        board[row][col] = value;
        return true; 
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



