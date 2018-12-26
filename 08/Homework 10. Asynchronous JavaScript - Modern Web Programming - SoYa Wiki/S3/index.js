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
        $('.apb').removeClass("disable_2").addClass("leave");
        req.forEach(element => {
            element.abort();
        });
    })

    $('#button'). mouseenter(function(){
        $('#info-bar').addClass("disable_1").find('#sum').text("").hide();
        $('.button').removeClass("clicked").removeClass("disable_1").removeClass("disable_2").find('.num').text("").hide();
        $('.apb').removeClass("disable_2").removeClass("leave");
        req = [];
    })

    $('.apb').click(function(){
        $('.apb').addClass("disable_2");
        robot();
    })

})

function enableInfoBar(){
    if(parseInt($('#A').find('.num').text()) + parseInt($('#B').find('.num').text()) + parseInt($('#C').find('.num').text()) + parseInt($('#D').find('.num').text()) + parseInt($('#E').find('.num').text())){
        $('#info-bar').removeClass("disable_1");
    }
}

function robot(){
    var id;
    for (var i = 0; i < 5; i++) {
        id = String.fromCharCode((65 + i))
        myClick(id);
        req.push($.get("randomNum"+i, function(id){
            return function(data, status){
                myGet(data, status, id);
                var sum = parseInt($('#A').find('.num').text()) + parseInt($('#B').find('.num').text()) + parseInt($('#C').find('.num').text()) + parseInt($('#D').find('.num').text()) + parseInt($('#E').find('.num').text())
                if(!isNaN(sum) &&  !($('#info-bar').hasClass("disable_1"))){
                    setTimeout(function(){
                        $('#info-bar').addClass("disable_1").find('#sum').text(sum).show();
                        
                    }, 500);
                    $('#info-bar').removeClass("disable_1");
                }
            }
        }(id)))
    }
    
}

function myClick(id){
    var that = '#' + id;
    if(!($(that).hasClass("disable_1")) && !($(that).hasClass("disable_2")) ){
        $(that).addClass('clicked').find('.num').text("...").show();
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



