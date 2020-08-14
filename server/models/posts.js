const mongoose = require('mongoose');
const User = require('./user');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: Array,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 400
  },
  location: {
    type: String,
    required: true
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