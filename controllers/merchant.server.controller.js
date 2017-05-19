"use strict";

var mongoose = require('mongoose'),
    Merchant = mongoose.model('Merchant'),
    errorHandler = require(appRoot+'/controllers/errors.server.controller'),
    xss = require('xss');


module.exports.errorURL = errorURL;
module.exports.list = list;
module.exports.createMerchant = createMerchant;
module.exports.getMerchantById = getMerchantById;
var crypto = require('./encrypt-decrypt');

const url = "https://localhost:3000/#!/error"
function errorURL(req,res,next){
	res.json({url:url});

}

function list(req,res,next){
  
Merchant.find()
    .exec(function(err, merchants){
    if(err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }else {
     console.log(JSON.stringify(merchants));
      for(var i=0; i<merchants.length; i++)
      { 
        var decrypted = crypto.decryptData(merchants[i]);
        merchants[i] = decrypted;
      }
    if(merchants.length>0)
      {
      var jsObject = merchants[0];
    res.json(jsObject);
    }
    else res.json({message:"No merchants"});
    }    
  });
  
}
function createMerchant(req,res,next){

 var merchant = new Merchant(req.body);
    crypto.encryptData(merchant);
merchant.save(function (err, merchant) {
  if (err){
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }
    else{
  console.log("Save successful");
   res.json(merchant); 
 }
});
    
}

function getMerchantById(req, res, next,id){
  Merchant.findById(id).exec(function(err,merchant){
    if(err)
   {
      var errMessage = errorHandler.getErrorMessage(err);
      errorHandler.logErrorMessage(errMessage);
      return res.status(400).send({
        message: errMessage
      });
    }else {
      res.json(merchant);
    }

  });
}