var bcrypt = require('bcryptjs');
var validator = require('../public/javascripts/validator');
var debug = require('debug')('signin:user');
var _ = require('lodash');

module.exports  = function(db){
    var users = db.collection('users');

    return {
        findUser: function(username, password){
            return users.findOne({username: username}).then(function(user){
                return user ? bcrypt.compare(password, user.password).then(function(){
                    return user;
                }) : Promise.reject("user doesn't exist");
            })
        },

        createUser: function(user){
           return bcrypt.hash(user.password, 10).then(function(hash){
               user.password = hash;
               delete user.repeatPassword;
               users.insertOne(user);
               return user;
           })
        },

        check: function(user){
            var formatErrors = validator.findFormatErrors(user);
            return new Promise(function(reslove, reject){
                formatErrors.length !== 0 ? reject(formatErrors) : reslove(user);
            }).then(function(){
                return users.findOne({$or: getQuery(user)}).then(function(existUser){
                    debug("existed user: ", existUser);
                    return existUser ? Promise.reject("user isn't unique") : Promise.resolve(user);
                })
            })
        }
    }
}

function getQuery(user){
    var query = [];
    for(var key in user){
        if(Object.prototype.hasOwnProperty.call(user, key)){
            if(key != 'password' && key != 'repeatPassword'){
                var obj = {};
                obj[key] = user[key];
                query.push(obj);
            }
        }
    }

    return query;
}
