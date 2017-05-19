"use strict";

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    errorHandler = require(appRoot+'/controllers/errors.server.controller'),
    xss = require('xss');

module.exports.list = list;
module.exports.createUser = createUser;
module.exports.getUserById = getUserById;
var crypto = require("./encrypt-decrypt");

function list(req, res, next){
  console.log('Get all users...');
  User.find()
    .exec(function(err, users){
    if(err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }else {
      for(var i=0; i<users.length; i++)
      { 
        var decrypted = crypto.decryptData(users[i]);
        users[i] = decrypted;
      }
      var jsObject = {users};
      res.json(jsObject);
    }    
  });
}

function createUser(req, res, next){
	  req.body = JSON.parse(xss(JSON.stringify(req.body)));
    var user = new User(req.body);
    crypto.encryptData(user);

    user.save(function (err, user) {
      if (err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }
    else{
      console.log("Save successful");
      res.json(user);
      } 
    });

        
}


function getUserById(req, res, next,id){
	console.log('Get single user...');
  User.findById(id).exec(function(err,user){
    if(err)
   {
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }else {
      res.json(user);
    }

  });
}
