window.onload = function(){
    document.getElementById("result").value = "0";

    //数字按钮
    document.getElementById("seven").onclick = function(){
        if(document.getElementById("result").value.length < 21 && document.getElementById("result").value != "0"){
            document.getElementById("result").value += "7";
        }
        else if(document.getElementById("result").value === "0"){
            document.getElementById("result").value = "7";
        }
    }

    document.getElementById("eight").onclick = function(){
        if(document.getElementById("result").value.length < 21 && document.getElementById("result").value != "0"){
            document.getElementById("result").value += "8";
        }
        else if(document.getElementById("result").value === "0"){
            document.getElementById("result").value = "8";
        }
    }

    document.getElementById("nine").onclick = function(){
        if(document.getElementById("result").value.length < 21 && document.getElementById("result").value != "0"){
            document.getElementById("result").value += "9";
        }
        else if(document.getElementById("result").value === "0"){
            document.getElementById("result").value = "9";
        }
    }


    document.getElementById("four").onclick = function(){
        if(document.getElementById("result").value.length < 21 && document.getElementById("result").value != "0"){
            document.getElementById("result").value += "4";
        }
        else if(document.getElementById("result").value === "0"){
            document.getElementById("result").value = "4";
        }
    }

    document.getElementById("five").onclick = function(){
        if(document.getElementById("result").value.length < 21 && document.getElementById("result").value != "0"){
            document.getElementById("result").value += "5";
        }
        else if(document.getElementById("result").value === "0"){
            document.getElementById("result").value = "5";
        }
    }

    document.getElementById("six").onclick = function(){
        if(document.getElementById("result").value.length < 21 && document.getElementById("result").value != "0"){
            document.getElementById("result").value += "6";
        }
        else if(document.getElementById("result").value === "0"){
            document.getElementById("result").value = "6";
        }
    }


    document.getElementById("one").onclick = function(){
        if(document.getElementById("result").value.length < 21 && document.getElementById("result").value != "0"){
            document.getElementById("result").value += "1";
        }
        else if(document.getElementById("result").value === "0"){
            document.getElementById("result").value = "1";
        }
    }

    document.getElementById("two").onclick = function(){
        if(document.getElementById("result").value.length < 21 && document.getElementById("result").value != "0"){
            document.getElementById("result").value += "2";
        }
        else if(document.getElementById("result").value === "0"){
            document.getElementById("result").value = "2";
        }
    }

    document.getElementById("three").onclick = function(){
        if(document.getElementById("result").value.length < 21 && document.getElementById("result").value != "0"){
            document.getElementById("result").value += "3";
        }
        else if(document.getElementById("result").value === "0"){
            document.getElementById("result").value = "3";
        }
    }


    document.getElementById("zero").onclick = function(){
        if(document.getElementById("result").value.length < 21 && document.getElementById("result").value != "0"){
            document.getElementById("result").value += "0";
        }
    }

    //运算符按钮
    document.getElementById("multiply").onclick = function(){
        var last = document.getElementById("result").value.charAt(document.getElementById("result").value.length - 1);
        if(last == "+" || last == "-" || last == "*" || last == "/" || last == "." || last == "("){
            document.getElementById("result").value = document.getElementById("result").value.substring(0, document.getElementById("result").value.length - 1);
        }
        if(document.getElementById("result").value.length < 21){
            document.getElementById("result").value += "*";
        }
    }

    document.getElementById("divide").onclick = function(){
        var last = document.getElementById("result").value.charAt(document.getElementById("result").value.length - 1);
        if(last == "+" || last == "-" || last == "*" || last == "/" || last == "." || last == "("){
            document.getElementById("result").value = document.getElementById("result").value.substring(0, document.getElementById("result").value.length - 1);
        }
            if(document.getElementById("result").value.length < 21){
                document.getElementById("result").value += "/";
            }
    }

    document.getElementById("subtract").onclick = function(){
        var last = document.getElementById("result").value.charAt(document.getElementById("result").value.length - 1);
        if(last == "+" || last == "-" || last == "*" || last == "/" || last == "." || last == "("){
            document.getElementById("result").value = document.getElementById("result").value.substring(0, document.getElementById("result").value.length - 1);
        }
            if(document.getElementById("result").value.length < 21){
                document.getElementById("result").value += "-";
            }
    }

    document.getElementById("point").onclick = function(){
        var last = document.getElementById("result").value.charAt(document.getElementById("result").value.length - 1);
        if(last == "+" || last == "-" || last == "*" || last == "/" || last == "." || last == "(" || last == ")"){
            document.getElementById("result").value = document.getElementById("result").value.substring(0, document.getElementById("result").value.length - 1);
        }
            if(document.getElementById("result").value.length < 21){
                document.getElementById("result").value += ".";
            }
    }

    document.getElementById("add").onclick = function(){
        var last = document.getElementById("result").value.charAt(document.getElementById("result").value.length - 1);
        if(last == "+" || last == "-" || last == "*" || last == "/" || last == "." || last == "("){
            document.getElementById("result").value = document.getElementById("result").value.substring(0, document.getElementById("result").value.length - 1);
        }
            if(document.getElementById("result").value.length < 21){
                document.getElementById("result").value += "+";
            }
    }

    document.getElementById("leftParenthesis").onclick = function(){
        if(document.getElementById("result").value.charAt(document.getElementById("result").value.length - 1) == "."){
            document.getElementById("result").value = document.getElementById("result").value.substring(0, document.getElementById("result").value.length - 1);
        }
        if(document.getElementById("result").value.length < 21 && document.getElementById("result").value != "0"){
            document.getElementById("result").value += "(";
        }
    
    }

    document.getElementById("rightParenthesis").onclick = function(){
        if(document.getElementById("result").value.charAt(document.getElementById("result").value.length - 1) == "."){
            document.getElementById("result").value = document.getElementById("result").value.substring(0, document.getElementById("result").value.length - 1);
        }
        if(document.getElementById("result").value.length < 21 && document.getElementById("result").value != "0"){
            document.getElementById("result").value += ")";
        }
    }

    //剩余按钮
    document.getElementById("goBack").onclick = function(){
        if(document.getElementById("result").value.length > 1){
            document.getElementById("result").value = document.getElementById("result").value.substring(0, document.getElementById("result").value.length - 1);
        }
        else if(document.getElementById("result").value != "0"){
            document.getElementById("result").value = "0";
        }
    }

    document.getElementById("clear").onclick = function(){
        document.getElementById("result").value = "0";
    }

    document.getElementById("equal").onclick = function(){
        try{
            var result = eval(document.getElementById("result").value);
        }
        catch(e){
            alert("Expression is illegal.");
            return ;
        }
        if(isNaN(result) || result == "Infinity" || result == "undefined"){
            alert("Expression is illegal");
        }
        else{
            document.getElementById("result").value = "" + result;
        }
    }

}