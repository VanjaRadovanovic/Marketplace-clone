const db = require('../models');

exports.createPost = async function (req, res, next) {
  try {
    let post = await db.Post.create({
      text: req.body.text,
      user: req.params.id
    })
    let foundUser = await db.User.findById(req.params.id);
    foundUser.posts.push(post.id);
    await foundUser.save();
    let foundPost = await db.Post.findById(post._id).populate('user', {
      username: true,
      profileImage: true
    })
    return res.status(200).json(foundPost);
  } catch (error) {
    console.log(error, 'createing post')
    return next(error);
  }
}

exports.getPost = async function (req, res, next) {
  try {
    let post = await db.Post.findById(req.params.message_id);

    res.status(200).json(post)

  } catch (error) {
    error.message = 'Message not found';
    next(error);
  }
}

exports.deletePost = async function (req, res, next) {
  try {
    let post = await db.Post.findById(req.params.message_id);
    await db.Post.deleteOne(post);
    res.status(200).json(post);

  } catch (error) {
    error.message = 'Cant find post';
    next(error);
  }
}