var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	username: String,
	password: String,
	coins: Number
}),
user = mongoose.model('user', userSchema);

module.exports = user;