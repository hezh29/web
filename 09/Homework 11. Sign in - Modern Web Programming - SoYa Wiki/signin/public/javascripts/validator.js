var validator = {
    form: {
        username: {
            status: false,
            errorInfo: "6~18位英文字母、数字或下划线，必须以英文字母开头"
        },
        password: {
            status: false,
            errorInfo: "密码为6~12位数字、大小写字母、中划线、下划线"
        },
        repeatPassword: {
            status: false,
            errorInfo: "两次密码不一致"
        },
        sid: {
            status: false,
            errorInfo: "8位数字，不能以0开头"
        },
        phone: {
            status: false,
            errorInfo: "11位数字，不能以0开头"
        },
        email: {
            status: false,
            errorInfo: "请输入合法的邮箱"
        }
    },
    findFormatErrors: function(user){
        var errorMessages = [];
        for(var key in user) {
            if(Object.prototype.hasOwnProperty.call(user, key)){
                if(!validator.isDataValid(key, user[key])){
                    errorMessages.push(validator.form[key].errorInfo);
                }
            }
        }
        return errorMessages;
    },
    isUsernameValid: function(username){
        return this.form.username.status = /^[a-zA-Z]\w{5,17}$/.test(username);
    },
    isSidValid: function(sid){
        return this.form.sid.status = /^[1-9]\d{7}$/.test(sid);
    },
    isPasswordValid: function(password){
        this.password = password;
        return this.form.password.status = /^[a-zA-Z0-9_\-]{6,12}$/.test(password);
    },
    isRepeatPasswordValid: function(repeatPassword){
        return this.form.repeatPassword.status = repeatPassword == this.password;
    },
    isPhoneValid: function(phone){
        return this.form.phone.status = /^[1-9]\d{10}$/.test(phone);
    },
    isEmailValid: function(email){
        return this.form.email.status = /^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/.test(email);
    },
    isDataValid: function(dataname, value){
        var temp = dataname[0].toUpperCase() + dataname.slice(1);
        return this["is" + temp + "Valid"](value);
    },
    isFormValid: function(){
        return this.form.username.status && this.form.sid.status && this.form.phone.status && this.form.email.status && ((typeof window !== 'object') || this.form.repeatPassword.status) && this.form.password.status;
    },
    isDataValueUnique: function(users, user, dataname){
        for(var key in users){
            if(users.hasOwnProperty(key) && users[key][dataname] == user[dataname]){
                return false;
            }
        }

        return true;
    }

}

if(typeof module == 'object'){
    module.exports = validator;
}