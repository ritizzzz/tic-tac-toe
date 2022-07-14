const elements = (function(){
    const gameCells = document.querySelectorAll('.gameCell');
    const onePlayerButton = document.querySelector('.onePlayer');
    const twoPlayerButton = document.querySelector('.twoPlayer');
    return{gameCells, onePlayerButton, twoPlayerButton}
})();

const player = function(name, symbol){
    let score = 0;
    return {name, symbol, score};
}

const gameBoard = (function() {
    let board = ['X', 'O', 'X', 'X', 'O', 'X', 'O', 'X', 'O'];
    
    const renderBoard = function(){
        for(let i = 0; i<elements.gameCells.length; i++){
            elements.gameCells[i].innerText = board[i];
        }
    }    
    const updateBoard = function(index, symbol){
        board[index] = symbol;
        renderBoard();
    }
    return {updateBoard, board}
})();

const eventsHandler = (function(){
    const addEventToButton = function(){
        elements.onePlayerButton.addEventListener('click', domUpdates.updateOnePlayer);
        elements.twoPlayerButton.addEventListener('click', domUpdates.updateTwoPlayer);   
    };
    const removeEventFromButton = function(){
        elements.onePlayerButton.removeEventListener('click', domUpdates.updateOnePlayer);
        elements.twoPlayerButton.removeEventListener('click', domUpdates.updateTwoPlayer);
    };
    const addEventTOBoard = function(){
        elements.gameCells.forEach(gameCell => {
             gameCell.addEventListener('click', gameBoard.updateBoard.bind(gameCell, gameCell.getAttribute('data-index'), 'X'))
        });
    };
    const removeEventFromBoard = function(){
        elements.gameCells.forEach(gamecell => {
            gamecell.removeEventListener('click', gameBoard.updateBoard);
        })
    }
    return{addEventToButton, removeEventFromButton, addEventTOBoard, removeEventFromBoard}
})();

eventsHandler.addEventTOBoard();