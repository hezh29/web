window.onload = function(){
    isClicked = 0;
    time = 30;
    score = 0
    isGameStart = 0;
    mole = 0;
    document.getElementById("button").onclick = gameStart;
    for(var i = 0; i < 60; i++){
        document.getElementsByTagName("input")[i].onclick = catchMole; 
    }
}

function gameStart(){
    if(!isGameStart){
        time = 30;
        score = 0
        isGameStart = 1;
        document.getElementById("showTime").textContent = "" + time;
        document.getElementById("showScore").textContent = "" + score;
        document.getElementById("gameState").textContent = "Game start";
        timerOfMoleAppear = setInterval(molesAppear, 1000);
        document.getElementsByTagName("input")[mole].checked = false;
    }
    else{
        isGameStart = 0;
        clearInterval(timerOfMoleAppear);
        document.getElementsByTagName("input")[mole].checked = false;
        document.getElementById("gameState").textContent = "Game stop";
    }
}

function molesAppear(){
    if(document.getElementsByTagName("input")[mole].checked){
        score --;
        document.getElementById("showScore").textContent = "" + score;
    }
    mole = Math.floor(Math.random( )* 60);
    while(mole == 60){
        mole = Math.floor(Math.random( )* 60);
    }
    document.getElementsByTagName("input")[mole].checked = true;
    checkTime();
    isClicked = 0;
}

function catchMole(event){
    if(document.getElementsByTagName("input")[mole] == event.target && isGameStart){
       if(!isClicked){
            isClicked = 1;
             score++;
        }
        document.getElementById("showScore").textContent = "" + score;
        document.getElementsByTagName("input")[mole].checked = false;
    }
    if(event.target.checked == true){
        event.target.checked = false;
        document.getElementsByTagName("input")[mole].checked = true;
    }
}

function checkTime(){
    time--;
    if(time <= 0){
        document.getElementsByTagName("input")[mole].checked = false;
        clearInterval(timerOfMoleAppear);
        isGameStart = 0;
        document.getElementById("gameState").textContent = "Game over"
    }
    document.getElementById("showTime").textContent = "" + time;
}

