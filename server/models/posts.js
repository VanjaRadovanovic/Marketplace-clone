const mongoose = require('mongoose');
const User = require('./user');

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxlength: 160
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

postSchema.pre('remove', async function (next) {
  try {
    let user = await User.findById(this.userId);
    user.posts.remove(this.id);
    await user.save();
    return next();
  } catch (error) {
    return next(error);
  }
})

module.exports = mongoose.model('Post', postSchema);