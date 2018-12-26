var express = require('express');
var router = express.Router();
var validator = require('../public/javascripts/validator');
var debug = require('debug')('signin:index');
var urltools = require('url');

module.exports = function(db){
  /* GET signup page. */
  var userManager = require('../models/user')(db);

  router.get('/signin', function(req, res, next) {
    res.render('signin', { title: '登陆' , user: {}});
  });

  router.post('/signin', function(req, res, next) {
    userManager.findUser(req.body.username, req.body.password)
      .then(function(user){
        req.session.user = user;
        req.session.save(function(){
          res.redirect('/detail');
        });

      })
      .catch(function(err){
        res.render('signin', {title: '登陆', error: '用户名或密码错误'});
      });
  });

  router.get('/signout', function(req, res, next) {
    req.session.user = null;
    req.session.save(function(){
      res.redirect('/signin'); 
    });

  });

  router.get('/regist', function(req, res, next) {
    res.render('signup', { title: '注册' , user: {}});
  });

  router.post('/regist', function(req, res, next) {
    var user = req.body;

    userManager.check(user)
      .then(userManager.createUser)
      .then(function(user){
        req.session.user = user;
        req.session.save(function(){
          res.redirect('/detail');
        });
      })
      .catch(function(err){
        console.log(err);
        res.render('signup', {title: '注册', user: user, error: err});
      });
    
  });

  /* GET detil page. */
  router.all('*', function(req, res, next) {
    req.session.user ? next() : res.redirect('/signin');
  });

  router.get('/', function(req, res, next) {
    var username = urltools.parse(req.url,true).query.username;
    if(req.session.user && req.session.user.username !== username && username){
      req.session.warning = "只能够访问自己的数据";
    }
    else{
      req.session.warning = null;
    }
    req.session.save(function(){
      res.redirect('/detail');
    });
  });

  router.get('/detail', function(req, res, next) {
    var warning = req.session.warning;
    req.session.warning = null;
    req.session.save(function(){
      res.render('detail', { title: '详情', user: req.session.user, warning: warning});
    })
  });

  return router;
}




// function check(user){
//   var errorMessage = [];

//   for(var key in user){
//       if(!validator.isDataValid(key, user[key])){
//           errorMessage.push(validator.form[key].errorInfo);
//       }

//       if(!validator.isDataValueUnique(users, user, key)){
//           errorMessage.push(key+" already exists.");
//       }
//   }

//   if(errorMessage.length > 0){
//       throw new Error(errorMessage.join("&"));
//   }
// }