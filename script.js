const elements = (function(){
    const gameCells = document.querySelectorAll('.gameCell');
    const onePlayerButton = document.querySelector('.onePlayer');
    const twoPlayerButton = document.querySelector('.twoPlayer');
    const buttonClump = document.querySelector('.buttonClump');
    const overlay = document.querySelector('.overlay');
    const playerOneDisplay = document.querySelector('.playerOne');
    const playerTwoDisplay = document.querySelector('.playerTwo');
    return{gameCells, onePlayerButton, twoPlayerButton, buttonClump, overlay, playerOneDisplay, playerTwoDisplay}
})();

const player = function(name, symbol){
    let score = 0;
    return {name, symbol, score};
}
const checkWinner = function(){
    const board = gameBoard.board;
    for(let i = 0; i<board.length; i++){
        if(board[i] !== undefined){
            if(i == 0 || i == 3 || i == 6){
                if(board[i+1] == board[i+2] && board[i] == board[i+1]){
                    console.log(board[i])
                }
            } 
            if(i == 0 || i == 1 || i == 2){
                if(board[i+3] == board[i+6] && board[i] == board[i+3]){
                    console.log(board[i]);
                }
            }
            if(i == 2){
                if(board[i+2] == board[i+4] && board[i] == board[i+2]){
                    console.log(board[i]);
                }
            }
            if(i == 0){
                if(board[i+4] == board[i+8] && board[i] == board[i+4]){
                    console.log(board[i]);
                }
            }
        }
    }
}

const gameBoard = (function() {
    let board = [];
    
    
    const renderBoard = function(){
        for(let i = 0; i<elements.gameCells.length; i++){
            if(board[i] !== undefined){
               elements.gameCells[i].innerText = board[i];
            }
        }
        checkWinner();
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

const domUpdates = (function(){
    const _removeButtonsAndOverlay = function(){
        elements.buttonClump.style.display = 'none';
        elements.overlay.classList.remove('overlayActive');
    };
    const updateOnePlayer = function(){
        _removeButtonsAndOverlay();
        eventsHandler.removeEventFromButton();
        eventsHandler.addEventTOBoard();
        elements.playerTwoDisplay.firstElementChild.innerText = 'Bot';
    };
    const updateTwoPlayer = function(){
        _removeButtonsAndOverlay();
        eventsHandler.removeEventFromButton();
        eventsHandler.addEventTOBoard();
    };
    return{updateOnePlayer, updateTwoPlayer};
})();

eventsHandler.addEventToButton();
