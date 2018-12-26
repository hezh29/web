$(function(){
    req = [];
    $(".button").click(function(){
        var that = this;
        $(that).addClass('clicked').find('.num').text("...").show();
        $(that).parent().find('.button').not($(that)).addClass("disable_1");
        $(that).addClass("disable_2");
        req.push($.get("randomNum"+Math.random(), function(data, status){
            if(status == 'success'){
                if($(that).hasClass('clicked')){
                    $(that).find('.num').text(data);
                    $(that).parent().find('.button').not($(that)).not($('.clicked')).removeClass("disable_1");
                    $(that).addClass("disable_1");
                    enableInfoBar();
                }
                $(that).removeClass("disable_2");
            }
        }))
    })

    $('#info-bar').click(function(){
        var sum = parseInt($('#A').find('.num').text()) + parseInt($('#B').find('.num').text()) + parseInt($('#C').find('.num').text()) + parseInt($('#D').find('.num').text()) + parseInt($('#E').find('.num').text())
        $(this).find('#sum').text(sum);
        $('#info-bar').addClass("disable_1");
    })

    $('#button').mouseleave(function(){
            $('#info-bar').addClass("disable_1").find('#sum').text("");
            $('.button').removeClass("clicked").removeClass("disable_1").removeClass("disable_2").find('.num').text("").hide();
            req.forEach(element => {
                element.abort();
            });
    })
    $('#button'). mouseenter(function(){
        req = [];
    })

})

function enableInfoBar(){
    if($('.clicked').length == 5){
        $('#info-bar').removeClass("disable_1");
    }
}