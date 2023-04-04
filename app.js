// Schema for Tic-Tac-Toe
const Player=(name,marker)=>{
    let points=0;
    return {name,marker}
};


const gameBoard = (()=>{
    let boardArray = Array(9).fill("");

    const mainSection =document.querySelector('.gameContainer');
    const buttonContainer = document.querySelector(".restartButton");
    const gameBoardContainer = document.createElement('div');
    const boardSize = 3*3;

    const renderBoard = ()=>{
        
            gameBoardContainer.classList.add("gameboard");

            for (let i = 0; i < boardSize ; i++) {
                let idString =i.toString(); //"square_"+ 
                let square = document.createElement("div");
                square.classList.add("square");
                square.setAttribute("id",idString);
                gameBoardContainer.appendChild(square);
            }

            const player =  document.createElement("div");
            player.classList="player";
            player.innerHTML="Player 'X' turn!";


            const button =  document.createElement("button");
            button.type="click";
            button.innerHTML="Restart Game";
            buttonContainer.appendChild(button);

            mainSection.appendChild(player);
            mainSection.appendChild(gameBoardContainer);


    };

    const setPositon = (index,marker)=>{
        boardArray[index]=marker;
    }
    
     const getGameArray =()=>{
        return boardArray;
    } 

    const resetBoardArray = ()=>{
        boardArray=Array(9).fill("");
    };

    const checkEmpty = (index)=>{
        if(boardArray[index]===""){
            return true;
        }else{
            return false;
        }

    };

    const cleanBoard =()=>{
        const squares = document.querySelectorAll(".square");
        const result  =  document.getElementsByClassName("player");

        result[0].innerHTML="Player 'X' turn!";

        squares.forEach((e)=>{
            e.innerHTML="";
        });

        resetBoardArray();
    };

    return{checkEmpty,renderBoard, setPositon, cleanBoard, getGameArray};

})();



const gameController = (()=>{

    let gameActive=true;
    let currentPlayer="player1"
    let count=0;

    const winningCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    const startGame = ()=>{
        // Ask for player names

        // Render board
        gameBoard.renderBoard();

        // Add Event Listeners
        const squares = document.querySelectorAll(".square");

        squares.forEach(element=>{
            element.addEventListener("click",_makePlayEvent);
        });

        const restartButton=  document.querySelector(".restartButton")

        restartButton.addEventListener("click",(e)=>{
            gameBoard.cleanBoard();
            gameActive=true;
            count=0;
        });

    };

    const _allEqualArray=(array)=>{
        const result = new Set(array).size===1;
        return result;
    }

    const _checkWinner = ()=>{
        winningCombos.forEach(element => {
            let array=element.map(i=>gameBoard.getGameArray()[i])
            if(_allEqualArray(array) & array[0]!=""){

                let symbol = array[0];
                const result  =  document.getElementsByClassName("player");
                result[0].innerHTML=`The winner is ${symbol}!!`
                gameActive=false;
                return true;

            }else{
                return false;

            }
        });
        
    };

    const _makePlayEvent = (e)=>{
        let idx = parseInt(e.target.id);
        const sq = document.getElementById(e.target.id);
        const player  =  document.getElementsByClassName("player");

        
        if(gameActive & gameBoard.checkEmpty(idx) & count<9){
            
            if(currentPlayer==="player1"){
                gameBoard.setPositon(idx,"X");
                sq.innerHTML="X";
                player[0].innerHTML="Player 'O' turn!";
                currentPlayer="player2";

            }else{
                gameBoard.setPositon(idx,"O");
                sq.innerHTML="O";
                player[0].innerHTML="Player 'X' turn!";
                currentPlayer="player1";
            }
            _checkWinner()
            count++;
        }

        if(count==9){
            player[0].innerHTML="It's a tie! No one wins!";
            count=0;
        }
    };

    
    return {startGame};
})();

gameController.startGame();
