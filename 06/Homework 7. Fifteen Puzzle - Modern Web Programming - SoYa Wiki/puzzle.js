window.onload = function(){
    var j;
    isStart = 0;
    a = [];
    for(j = 0; j < 17; j++){
        a[j] = j;
    }

    document.getElementById("playArea").onclick = clickPhoto;
    document.getElementById("button").onclick = start;
    document.getElementsByTagName("button")[0].onfocus = cancel;
}

function clickPhoto(event){
    var now,up, down, left, right, temp, i, temp2;
    if(isStart && event.target.tagName == "IMG"){
        now = event.target.parentNode.id.substring(1);
        down  = parseInt(now) + 4;
        up = parseInt(now) - 4;
        left = parseInt(now) - 1;
        right = parseInt(now) + 1;

        if(13 <= now && now <= 16){
            down = now;
        }

        if(0 < now && now <= 4){
            up = now;
        }

        if(now % 4 == 1){
            left = now;
        }

        if(now % 4 == 0){
            right = now;
        }

    
        if(document.getElementById("p" + down).className == "c16" || document.getElementById("p" + up).className == "c16" || document.getElementById("p" + left).className == "c16" || document.getElementById("p" + right).className == "c16"){
            temp2 = a[document.getElementsByClassName("c16")[0].getAttribute("class").substring(1)];
            a[document.getElementsByClassName("c16")[0].getAttribute("class").substring(1)] = a[document.getElementById("p" + now).getAttribute("class").substring(1)];
            a[document.getElementById("p" + now).getAttribute("class").substring(1)] = temp2;
            temp = document.getElementsByClassName("c16")[0].id;
            document.getElementsByClassName("c16")[0].id = event.target.parentNode.id;
            event.target.parentNode.id = temp;
        }

        if(isWin()){
            alert("You Win.");
            isStart = 0;
        }
    }
}

function isWin(){
    var i;

    for(i = 1; i < 17; i++){
        if(a[i] !== i){
            return 0;
       }
    }

    return 1;
}

function start(){
    var i, direction;
    isStart = 1;
    for(i = 0; i < 800; i++){
        direction = Math.floor(Math.random() * 4);
        while((direction === 0 && 0 < a[16] && a[16] <= 4) || (direction === 1 && 13 <= a[16] && a[16] <= 16) || (direction === 2 && a[16] % 4 == 1) || (direction === 3 && a[16] % 4 == 0)){
            direction = Math.floor(Math.random() * 4);
        }

        switch(direction){
            case 0 : swap(a[16] - 4);break;
            case 1 : swap(a[16] + 4);break;
            case 2 : swap(a[16] - 1);break;
            case 3 : swap(a[16] + 1);break;
        }
    }

    for(i = 1; i <= 16; i++){
        document.getElementById("playArea").childNodes[i].id = "p" + a[i];
    }
   
}

function swap(n){
    var temp, i;
    for(i = 1; i <= 16; i++){
        if(a[i] === n){
            break;
        }
    }
  
    temp = a[16];
    a[16] = a[i];
    a[i] = temp;
}

function cancel(){
    setTimeout(loseFocus, 1000);
}

function loseFocus(){
    document.getElementsByTagName("button")[0].blur();
}