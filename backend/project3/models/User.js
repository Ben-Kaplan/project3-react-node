const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    comments: []
});
UserSchema.methods.validPassword = async function(password){
	  const validTest = bcrypt.compare(password, this.password);
};
UserSchema.plugin(findOrCreate);
UserSchema.pre('save', async function(next){
	  if (!this.password) {
		  next();
		  return;
	  }
    const existingUser = await User.findOne({username: this.username})
    if(!existingUser) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
const User = mongoose.model('User', UserSchema);

module.exports = User;