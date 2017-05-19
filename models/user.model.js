var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

  name: String,
  surname: String,
  jmbg: String,
  passportNumber: String,
  address: String,
  telephone: String,
  isContractor: Boolean,       //ugovarac na engleskom? :D
  email: String,
  age: Number,
  sport: {
    type: Schema.Types.ObjectId,
    ref: 'Sport'
  }
});

var User = mongoose.model('User', userSchema);