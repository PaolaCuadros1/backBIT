const mongosee = require('mongoose');
const Schema = mongosee.Schema;

//Es sencible a minusculas y mayusculas... NO es lo mismo decir String a string.
var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  image: String
});
module.exports = mongosee.model('User', UserSchema);