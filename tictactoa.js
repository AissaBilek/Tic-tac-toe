function gameBoard(){
    this.board=[
      ['','',''],
      ['','',''],
      ['','','']
    ];
    
}
function chooseNow(row,index){
    const gameBoardobject = new gameBoard(); 
    const statCell=gameBoard.board[row][index];
    console.log(statCell);
}
