window.onload = function(){
    notCheat = 0;
    notTouchWall = 1;
    isStartGame = 0;

    document.getElementById("start").onmouseover = function(){
        isStartGame = 1;
        notCheat = 1;
        notTouchWall = 1;
        showMessage("  ");
        while(document.getElementsByClassName("changedWall").length > 0){
            document.getElementsByClassName("changedWall")[0].className = "wall";
        }
    }   

    document.getElementById("end").onmouseover = function(){
        if(notCheat && notTouchWall){
            showMessage("You Win");
            isStartGame = 0;
        }
        else if(!notCheat){
            showMessage("Don't cheat, your should start from the 'S' and move to the 'E' inside the maze!")
            isStartGame = 0;
        }
    }

    document.getElementById("playArea").onmouseleave = function(e){
        e.stopPropagation();
        notCheat = 0;
        notTouchWall = 1;
        while(document.getElementsByClassName("changedWall").length > 0){
            document.getElementsByClassName("changedWall")[0].className = "wall";
        }
    }

    for(var i = 0; i < 5; i++){
        document.getElementsByClassName("wall")[i].onmouseover = function(){
            notTouchWall = 0;
            if(isStartGame){
                showMessage("You Lose");
                while(document.getElementsByClassName("wall").length > 0){
                    document.getElementsByClassName("wall")[0].className = "changedWall";
                    isStartGame = 0;
                }
            }
        }
    }
}

function showMessage(message){
    document.getElementById("message").textContent = message;
}
