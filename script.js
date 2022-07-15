
const _elements = (function(){
    const gameCells = document.querySelectorAll('.gameCell');
    const onePlayerButton = document.querySelector('.onePlayer');
    const twoPlayerButton = document.querySelector('.twoPlayer');
    const buttonClump = document.querySelector('.buttonClump');
    const overlay = document.querySelector('.overlay');
    const playerOneDisplay = document.querySelector('.playerOne');
    const playerTwoDisplay = document.querySelector('.playerTwo');
    return{gameCells, onePlayerButton, twoPlayerButton, buttonClump, overlay, playerOneDisplay, playerTwoDisplay}
})();


const gameBoard = (function() {
    let board = [];    
    const _renderBoard = function(){
        for(let i = 0; i<_elements.gameCells.length; i++){
            if(board[i] !== undefined){
                _elements.gameCells[i].innerText = board[i];
            }
        }
        // checkWinner();
    }    
    const updateBoard = function(index, symbol){
        board[index] = symbol;
        _renderBoard();
    }
    return {updateBoard, board}
})();


const player = function(name, symbol){
    let score = 0;

    const _drawnOn = function(index){
       if( gameBoard.board[index] === undefined){
           return false;
       }else{
           return true;
       }
    }

    const draw = function(index){
        if(!_drawnOn(index)){
            gameBoard.updateBoard(index, this.symbol);
        }
    }
    return {name, symbol, score, draw};
}


const choosePlayType = (function(){
    let players = [];
 
    const _removeButtonsAndOverlay = function(){
        _elements.buttonClump.style.display = 'none';
        _elements.overlay.classList.remove('overlayActive');
        _removeEventFromButton();
        gameFlow.init();
    };
  
    const _twoPlayer = function(){
        const playerOne = player('Player1', 'X');
        const playerTwo = player('Player2', 'O');
        players.push(playerOne, playerTwo);
        _removeButtonsAndOverlay();
    };
    const _onePlayer = function(){
        const playerOne = player('Player1', 'X');
        const bot = player('bot', 'O');
        players.push(playerOne, bot);
        _removeButtonsAndOverlay();
    };
 

    const addEventsToButtons = function(){
        _elements.onePlayerButton.addEventListener('click', _onePlayer);
        _elements.twoPlayerButton.addEventListener('click', _twoPlayer);   
    };

    const _removeEventFromButton = function(){
        _elements.onePlayerButton.removeEventListener('click', _onePlayer);
        _elements.twoPlayerButton.removeEventListener('click', _twoPlayer);
    };


    addEventsToButtons();
    return{players}
})();



const gameFlow = (function(){
    let _players = [];
    let _turnTracker = 0;

    const checkWinner = function(){
        const board = gameBoard.board;
        for(let i = 0; i<board.length; i++){
            if(board[i] !== undefined){
                if(i == 0 || i == 3 || i == 6){
                    if(board[i+1] == board[i+2] && board[i] == board[i+1]){
                        return board[i];
                    }
                } 
                if(i == 0 || i == 1 || i == 2){
                    if(board[i+3] == board[i+6] && board[i] == board[i+3]){
                        return board[i];
                    }
                }
                if(i == 2){
                    if(board[i+2] == board[i+4] && board[i] == board[i+2]){
                        return board[i];
                    }
                }
                if(i == 0){
                    if(board[i+4] == board[i+8] && board[i] == board[i+4]){
                        return board[i];
                    }
                }
            }
        }
        if(board.length == 9 && !board.includes(undefined) ){
            return 'tie';
        }
        return false;
    };

    const init = function(){
        _players.push(...choosePlayType.players);
        _turnTracker = 0;
        _eventToGameCells();
    }

    
    const _eventToGameCells = function(){
        _elements.gameCells.forEach(gamecell => {
            gamecell.addEventListener('click', _makeMove);
        });
    }

    const _removeFromGameCells = function(){
        _elements.gameCells.forEach(gamecell => {
            gamecell.removeEventListener('click', _makeMove);
        })
    }

    const _makeMove = function(event){
        _players[_turnTracker].draw(event.target.getAttribute('data-index'));
        if(_turnTracker){
            _turnTracker -= 1;
        }else{
            _turnTracker += 1;
            if(_players[_turnTracker].name === 'bot'){
                _removeFromGameCells();
            }
        }
    }

    return {init};
})();












// const eventsHandler = (function(){
//     const _removeButtonsAndOverlay = function(){
//         elements.buttonClump.style.display = 'none';
//         elements.overlay.classList.remove('overlayActive');
//         removeEventFromButton();
//         addEventTOBoard();
//     };
//     const _twoPlayer = function(){
//         _removeButtonsAndOverlay();
//         const playerOne = player('Player1', 'X');
//         const playerTwo = player('Player2', 'O');
//         return {playerOne, playerTwo}
//     };
//     const _onePlayer = function(){
//         _removeButtonsAndOverlay();
//         const playerOne = player('Player1', 'X');
//         const bot = player('bot', 'O');
//         return {playerOne, bot}
//     }

//     const addEventToButton = function(){
//         elements.onePlayerButton.addEventListener('click', _onePlayer);
//         elements.twoPlayerButton.addEventListener('click', _twoPlayer);   
//     };
//     const removeEventFromButton = function(){
//         elements.onePlayerButton.removeEventListener('click', _onePlayer);
//         elements.twoPlayerButton.removeEventListener('click', _twoPlayer);
//     };
//     const addEventTOBoard = function(){
//         elements.gameCells.forEach(gameCell => {

//              gameCell.addEventListener('click', gameBoard.updateBoard.bind(gameCell, gameCell.getAttribute('data-index'), 'X'))
//         });
//     };
//     const removeEventFromBoard = function(){
//         elements.gameCells.forEach(gamecell => {
//             gamecell.removeEventListener('click', gameBoard.updateBoard);
//         })
//     }
//     return{addEventToButton, removeEventFromButton, addEventTOBoard, removeEventFromBoard}
// })();






// const player = function(name, symbol){
//     let score = 0;

//     const _drawnOn = function(index){
//        if(elements.gameCells[index].innerText  === ''){
//            return false;
//        }else{
//            return true;
//        }
//     }

//     const draw = function(index){
//         if(!_drawnOn(index)){
//           elements.gameCells[index].innerText = this.symbol;
//         }
//     }
//     return {name, symbol, score, draw};
// }



// eventsHandler.addEventToButton();

