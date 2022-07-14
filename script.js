const gameBoard = (function() {
    let board = ['X', 'O', 'X', 'X', 'O', 'X', 'O', 'X', 'O'];
    let updateBoard = function(index, symbol){
        board[index] = symbol;
        return board;
    }
    return {updateBoard};
})();


const player = function(name, symbol){
    let score = 0;
    return {name, symbol, score};
}
