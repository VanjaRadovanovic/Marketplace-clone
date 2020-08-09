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

}

exports.deletePost = async function (req, res, next) {

}