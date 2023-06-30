let mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  myCollection: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }]
});
module.exports = mongoose.model('User', userSchema);