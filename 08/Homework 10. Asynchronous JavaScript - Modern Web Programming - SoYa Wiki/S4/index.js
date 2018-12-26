$(function(){
    req = [];
    $(".button").click(function(){
        var that = this;
        $(that).addClass('clicked').find('.num').text("...").show();
        $(that).parent().find('.button').not($(that)).addClass("disable_1");
        $(that).addClass("disable_2");
        $.get("randomNum", function(data, status){
            if(status == 'success'){
                if($(that).hasClass('clicked')){
                    $(that).find('.num').text(data);
                    $(that).parent().find('.button').not($(that)).not($('.clicked')).removeClass("disable_1");
                    $(that).addClass("disable_1");
                    enableInfoBar();
                }
                $(that).removeClass("disable_2");
            }
        })
    })

    $('#info-bar').click(function(){
        var sum = parseInt($('#A').find('.num').text()) + parseInt($('#B').find('.num').text()) + parseInt($('#C').find('.num').text()) + parseInt($('#D').find('.num').text()) + parseInt($('#E').find('.num').text())
        $(this).find('#sum').text(sum);
    })

    $('#button').mouseleave(function(){
        $('#info-bar').addClass("disable_1").find('#sum').text("");
        $('.button').removeClass("clicked").addClass("disable_1").addClass("disable_2").find('.num').text("").hide();
        $('#order').text("").hide();
        $('.apb').removeClass("disable_2").addClass("leave");
        req.forEach(element => {
            element.abort();
        });
    })

    $('#button'). mouseenter(function(){
        $('#info-bar').addClass("disable_1").find('#sum').text("").hide();
        $('.button').removeClass("clicked").removeClass("disable_1").removeClass("disable_2").find('.num').text("").hide();
        $('.apb').removeClass("disable_2").removeClass("leave");
        $('#order').text("").hide();
        req = [];
    })

    $('.apb').click(function(){
        var arr = [0, 1, 2, 3, 4], order;
        $('.apb').addClass("disable_2");
        getRandomOrder(arr);
        order = arr.reduce(function(accumulator, currentValue){
            return accumulator + String.fromCharCode((65 + currentValue));
        }, "")
        $('#order').text(order).show();    
        robot(arr);
    })

})

function getRandomOrder(arr){
    var counter = 5000, temp, rand_1, rand_2;
    while(counter--){
        rand_1 = getRandomNumber(4);
        rand_2 = getRandomNumber(4);
        temp = arr[rand_1];
        arr[rand_1] = arr[rand_2];
        arr[rand_2] = temp;
    }
}

function getRandomNumber(limit) {
    return Math.round(Math.random() * limit);
}

function enableInfoBar(){
    if($('.clicked').length == 5){
        $('#info-bar').removeClass("disable_1");
    }
}

function robot(arr){
    var id = String.fromCharCode((65 + arr[0]));
    myClick(id);
    if($('.apb').hasClass('leave')){
        return;
    }
    req[0] = $.get("randomNum" + Math.random(), function(data, status){
        myGet(data, status, id);
        id = String.fromCharCode((65 + arr[1]));
        myClick(id);
        if($('.apb').hasClass('leave')){
            return;
        }
        req[1] = $.get("randomNum" + Math.random(), function(data, status){
            myGet(data, status, id);
            id = String.fromCharCode((65 + arr[2]));
            myClick(id);
            if($('.apb').hasClass('leave')){
                return;
            }
            req[2] = $.get("randomNum" + Math.random(), function(data, status){
                myGet(data, status, id);
                id = String.fromCharCode((65 + arr[3]));
                myClick(id);
                if($('.apb').hasClass('leave')){
                    return;
                }
                req[3] = $.get("randomNum" + Math.random(), function(data, status){
                    myGet(data, status, id);
                    id = String.fromCharCode((65 + arr[4]));
                    myClick(id);
                    if($('.apb').hasClass('leave')){
                        return;
                    }
                    req[4] = $.get("randomNum" + Math.random(), function(data, status){
                        myGet(data, status, id);
                        var sum = parseInt($('#A').find('.num').text()) + parseInt($('#B').find('.num').text()) + parseInt($('#C').find('.num').text()) + parseInt($('#D').find('.num').text()) + parseInt($('#E').find('.num').text());
                        if($('.clicked').length == 5 && !isNaN(sum)){
                            setTimeout(function(){
                                $('#info-bar').addClass("disable_1").find('#sum').text(sum).show();
                                
                            }, 500);
                            $('#info-bar').removeClass("disable_1");
                        }
                    })
                })
            })
        })
    })
    
}

function myClick(id){
    var that = '#' + id;
    if(!($(that).hasClass("disable_1")) && !($(that).hasClass("disable_2")) ){
        $(that).addClass('clicked').find('.num').text("...").show();
        $(that).parent().find('.button').not($(that)).addClass("disable_1");
        $(that).addClass("disable_2");
    }
}

function myGet(data, status, id){
    var that = '#' + id;
    if(status == 'success'){
        if($(that).hasClass('clicked') && !($(that).hasClass("disable_1"))){
            $(that).find('.num').text(data);
            $(that).parent().find('.button').not($(that)).not($('.clicked')).removeClass("disable_1");
            $(that).addClass("disable_1");
            enableInfoBar();
        }
        $(that).removeClass("disable_2");
    }
}



