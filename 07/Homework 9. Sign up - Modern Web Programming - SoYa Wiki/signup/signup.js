$(function(){
    $("input:not(.button)").blur(function(){
        if(validator.isDataValid(this.id, $(this).val())){
            $(this).parent().find(".error").text("").hide();
        }
        else{
            $(this).parent().find(".error").text(validator.form[this.id].errorInfo).show();
        }
    })

    $(".submit").click(function(){
        if($(".errorBox")){
            $(".errorBox").hide();
        }
        $("input:not(.button)").blur();

        return validator.isFormValid();
    })
    
    $(".reset").click(function(){
        if($(".errorBox")){
            $(".errorBox").hide();
        }
        
        $("input:not(.button)").attr("value", "").val("").blur();
        
    })

})