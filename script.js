let players = [];
const _elements = (function(){
    const gameCells = document.querySelectorAll('.gameCell');
    const onePlayerButton = document.querySelector('.onePlayer');
    const twoPlayerButton = document.querySelector('.twoPlayer');
    const buttonClump = document.querySelector('.buttonClump');
    const overlay = document.querySelector('.overlay');
    const playerOneDisplay = document.querySelector('.playerOne');
    const playerTwoDisplay = document.querySelector('.playerTwo');
    const winnerDeclaration = document.querySelector('.winnerDeclaration');
    return{gameCells, onePlayerButton, twoPlayerButton, buttonClump, overlay, playerOneDisplay, playerTwoDisplay, winnerDeclaration};
})();

const gameBoard = (function() {
    let _board = [];    
    const _renderDisplay = function(){
        for(let i = 0; i<_elements.gameCells.length; i++){
            if(_board[i] !== undefined){
                _elements.gameCells[i].innerText = _board[i];
            }  
        }
    }    

    const emptyDisplay = function(){
        _elements.gameCells.forEach(gameCell => {
            gameCell.innerText = '';
        })
    }

    const emptyBoard = function(){
        _board = [];
    }
   
 
    const updateBoard = function(index, symbol){
         _board[index] = symbol;
        _renderDisplay();
    }

    const getBoard = function(){
        return _board;
    }

    const declareWinner = function(text){
        _elements.winnerDeclaration.innerText = text;
    }

    const renderPlayerDisplay = function(){
        _elements.playerOneDisplay.firstElementChild.value = players[0].name;
       _elements.playerOneDisplay.lastElementChild.innerText = `Score: ${players[0].score}`;
       _elements.playerTwoDisplay.firstElementChild.value = players[1].name;
       _elements.playerTwoDisplay.lastElementChild.innerText = `Score: ${players[1].score}`;
    }

    return {updateBoard, emptyDisplay, declareWinner, renderPlayerDisplay, emptyBoard, getBoard}
})();


const player = function(name, symbol, isBot){
    let score = 0;

    const _drawnOn = function(index){
       if( gameBoard.getBoard()[index] === undefined){
           return false;
       }else{
           return true;
       }
    }

    
    const draw = function(index){
        if(!_drawnOn(index)){
            gameBoard.updateBoard(index, this.symbol);
            return true;
        }
    }

    const changeName = function(newName){
        if(!isBot){
            this.name = newName;
        }
    }
    
    return {name, symbol, score, draw, changeName, isBot};
}

const choosePlayType = (function(){
    const _changeName = function(isOnePlayer){

        const inputPlayerOne = _elements.playerOneDisplay.firstElementChild;
        const inputPlayerTwo = _elements.playerTwoDisplay.firstElementChild;

        if(isOnePlayer){
            if(!inputPlayerTwo.disabled){
                inputPlayerTwo.disabled = true;
            }
            inputPlayerOne.addEventListener('input', () => {
               players[0].changeName(inputPlayerOne.value); 
            });

        }else{

            inputPlayerOne.addEventListener('input', () => {
               players[0].changeName(inputPlayerOne.value); 
            });

            inputPlayerTwo.disabled = false;
            inputPlayerTwo.addEventListener('input', () => {
               players[1].changeName(inputPlayerTwo.value); 
            });
        }
    };

    const _removeButtonsAndOverlay = function(){
        _elements.buttonClump.style.display = 'none';
        _elements.overlay.classList.remove('overlayActive');
        _removeEventFromButton();
        gameBoard.emptyDisplay();
        gameFlow.init();
    };

    const _addButtonsAndOverlay = function(){
        if(_elements.buttonClump.childElementCount !== 3){
            let button = document.createElement('button');
            button.innerText = 'Play Again';
            button.addEventListener('click', _removeButtonsAndOverlay);
            _elements.buttonClump.appendChild(button);
        }
        _elements.buttonClump.style.display = 'block';
        _elements.overlay.classList.add('overlayActive');
        addEventsToButtons();
    }

    const init = function(){
        _addButtonsAndOverlay();
    }
  
    const _twoPlayer = function(){
        players = [];
        const playerOne = player('Player1', 'X', false);
        const playerTwo = player('Player2', 'O', false);

        _changeName(0);
        players.push(playerOne, playerTwo);    
        gameBoard.renderPlayerDisplay();
        _removeButtonsAndOverlay();
    };

    const _onePlayer = function(){
        players = [];
        const playerOne = player('Player1', 'X', false);
        const bot = player('bot', 'O', true);
        players.push(playerOne, bot);
        gameBoard.renderPlayerDisplay();
        _removeButtonsAndOverlay();
        _changeName(1);
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
    return {init, addEventsToButtons};
})();



const gameFlow = (function(){
    let _turnTracker = 0;

    const returnResult = function(){
        const board = gameBoard.getBoard();
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
        if(players[_turnTracker].draw(event.target.getAttribute('data-index'))){
            if(returnResult()){
                _removeFromGameCells();
                endGame.init(returnResult());
            }else{
                if(_turnTracker){
                    _turnTracker -= 1;
                }else{
                    _turnTracker += 1;
                    if(players[_turnTracker].name === 'bot'){
                        _removeFromGameCells();
                        _makeBotMove();
                        if(returnResult()){
                            _removeFromGameCells();
                            endGame.init(returnResult());
                        }
                        _turnTracker -= 1;
                    }
                }    
            }  
        }
    }
    
    const _makeBotMove = function(){
        const botBoard = ['', '', '', '', '', '', '', '', ''];
        let availableMoves = [];
        for(let i = 0; i<botBoard.length; i++){
            if(gameBoard.getBoard()[i] !== undefined){
                botBoard.splice(i, 1, gameBoard.getBoard()[i]);
            }
            if(botBoard[i] == ''){
                availableMoves.push(i);
            }
        }
      
        const index = availableMoves[Math.floor(Math.random()*availableMoves.length)];
        players[1].draw(index)
        _eventToGameCells();
    }

    return {init};
})();




const endGame = (function(){
    const init = function(result){
        if(result === 'tie'){
            gameBoard.declareWinner("It's a tie!!");
        }else{
            for(let i = 0; i<players.length; i++){
                if(players[i].symbol === result){
                    players[i].score += 1;
                    gameBoard.renderPlayerDisplay();
                    gameBoard.declareWinner(`The winner is ${players[i].name}(${players[i].symbol})`);
                }
            }
        }
        choosePlayType.init();
        gameBoard.emptyBoard();
    }
    return {init};
})();







