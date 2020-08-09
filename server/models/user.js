const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const uniqueValidator = require('mongoose-unique-validator');

const userShema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  password: {
    type: String,
    required: true
  },
  profileImageUrl: {
    type: String
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: './posts.js'
  }]
});

userShema.plugin(uniqueValidator);

userShema.pre('save', async function (req, res, next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();

  } catch (error) {
    return next(error);
  }
})

userShema.methods.comparePassword = async function (candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    return next(error);
  }
}

module.exports = mongoose.model('User', userShema);