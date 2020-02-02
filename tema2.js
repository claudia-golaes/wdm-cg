const gameBoard = (() => { 
    var boardArray = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    var currentMark = "X"; 
    var playerOne; 
    var playerTwo; 

    function makeBoard() {  
        const boxSize = 150 + "px";
        const container = document.getElementById("boardContainer");

        container.style.gridTemplateColumns = `repeat(3, 1fr)`;
        container.style.gridTemplateRows = `repeat(3, 1fr)`;

        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                var div = document.createElement("div");
                div.style.width = boxSize;
                div.style.height = boxSize;
                div.classList.add("boxes");
                div.setAttribute("id", "div" + i + j);
                container.appendChild(div);
            };
        }
    };

    function resetGrid() {  
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++){
                document.getElementById("div" + i + j).innerHTML = ""; 
                document.getElementById("div" + i + j).addEventListener("click", markBox);
                boardArray[i][j] = ""; 
            }
        }
        currentMark = "X"; 
    }




    function startGame() {

        playerOne = document.getElementById("playerOneName").value; 
        if (document.getElementById("checkbox").checked == true) {
            playerTwo = "the Computer"; 
        } else {
            playerTwo = document.getElementById("playerTwoName").value; 
        }
        if (playerOne.trim() == "") {          
            playerOne = "Player One"; 
        }
        if (playerTwo.trim() == "") {
            playerTwo = "Player Two"; 
        }
        document.getElementById("endGameButton").style.display = "inline-block";
        document.getElementById("checkbox").disabled = true;                     
        document.getElementById("displayText").innerHTML = playerOne + " e primul!"; 
        resetGrid(); 
    }

    function endGame() {
        document.getElementById("endGameButton").style.display = "none";
        declareWinner("end"); 
    }

    function markBox(boxA, boxB) {
        let check; 
        if (!isNaN(boxA)) {                                        
            boardArray[boxA][boxB] = currentMark;                  
            boxA = document.getElementById("div" + boxA + boxB);   
            check = false; 
        } else {
            boxB = boxA.target.id.slice(4);
            boxA = boxA.target.id.slice(3, 4);                 
            boardArray[boxA][boxB] = currentMark;              
            boxA = document.getElementById("div" + boxA + boxB); 
            check = true; 
        }
        boxA.innerHTML = currentMark;                      
        boxA.removeEventListener("click", markBox); 
        swapMark(check);                                   
    } 

    function swapMark(check) {  
        if (currentMark == "X") {
            currentMark = "O"; 
            document.getElementById("displayText").innerHTML = "E randul lui " + playerTwo  + "!"; 
        } else {
            currentMark = "X"; 
            document.getElementById("displayText").innerHTML = "E randul lui " + playerOne  + "!"; 
        }
        if (check == false) {    
            return;             
        }
        checkWin();             
        computerPlay();    
    }

    function computerPlay() {
        if (document.getElementById("checkbox").checked == true && document.getElementById("checkbox").disabled == true) { 
            var cntr = 0; 
            while (true) {                               
                var numA = Math.floor(Math.random() * 3);
                var numB = Math.floor(Math.random() * 3);  
                if (cntr == 20) {                       
                    break;                                 
                }                                          
                if (boardArray[numA][numB] == "") {        
                    markBox(numA, numB);                   
                    break; 
                }
                cntr++; 
            }
            checkWin();   
        }
    }

    function checkWin() {   
        if (boardArray[0][0] == boardArray[0][1] && boardArray[0][1] == boardArray[0][2] && boardArray[0][0] != "") {
                declareWinner(boardArray[0][0]); 
        } else if (boardArray[1][0] == boardArray[1][1] && boardArray[1][1] == boardArray[1][2] && boardArray[1][0] != "") {
                declareWinner(boardArray[1][0]);
        } else if (boardArray[2][0] == boardArray[2][1] && boardArray[2][1] == boardArray[2][2] && boardArray[2][0] != "") {
                declareWinner(boardArray[2][0]); 
        } else if (boardArray[0][0] == boardArray[1][0] && boardArray[1][0] == boardArray[2][0] && boardArray[0][0] != "") {
                declareWinner(boardArray[0][0]); 
        } else if (boardArray[0][1] == boardArray[1][1] && boardArray[1][1] == boardArray[2][1] && boardArray[0][1] != "") {
                declareWinner(boardArray[0][1]); 
        } else if (boardArray[0][2] == boardArray[1][2] && boardArray[1][2] == boardArray[2][2] && boardArray[0][2] != "") {
            declareWinner(boardArray[0][2]); 
        } else if (boardArray[0][0] == boardArray[1][1] && boardArray[1][1] == boardArray[2][2] && boardArray[0][0] != "") {
            declareWinner(boardArray[0][0]);
        } else if (boardArray[0][2] == boardArray[1][1] && boardArray[1][1] == boardArray[2][0] && boardArray[0][2] != "") {
            declareWinner(boardArray[0][2]); 
        } else {
            var k = 0; 
            for (i = 0; i < 3; i++) {
                for (j = 0; j < 3; j++) {                         
                    if (boardArray[i][j] != "") {                 
                        k++;            
                    }
                }
            };
            if (k == 9) {
                declareWinner("Tie");
            }
        }
    }

    function declareWinner(winner) {
        if (winner == "X") {
            document.getElementById("displayText").innerHTML = "Castigaorul este  " + playerOne + "!"; 
        } else if (winner == "O") {
            document.getElementById("displayText").innerHTML = "Castigaorul este " + playerTwo + "!"; 
        } else if (winner == "end") {
            document.getElementById("displayText").innerHTML = "Gata jocul!"; 
        } else {
            document.getElementById("displayText").innerHTML = "Remiza."; 
        }
        
        for (i = 0; i < 3; i++) {      
            for (j = 0; j < 3; j++) {
                document.getElementById("div" + i + j).removeEventListener("click", markBox);
            }
        }
        document.getElementById("endGameButton").style.display = "none"; 
        document.getElementById("checkbox").disabled = false; 
    }                                                         

    function disablePlayerTwo() {   
        if (document.getElementById("checkbox").checked == true) {
            document.getElementById("playerTwoName").disabled = true;
        } else {
            document.getElementById("playerTwoName").disabled = false;
        }
        }

    return {
      makeBoard, 
      startGame,
      disablePlayerTwo,
      endGame
    };
  })();

gameBoard.makeBoard();






document.getElementById("checkbox").checked = false; 
document.getElementById("playerOneName").value = "";
document.getElementById("playerTwoName").value = "";