const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signup = async function (req, res, next) {
  try {
    let user = await db.User.create(req.body);
    let { id, username, profileImageUrl } = user;
    let token = jwt.sign({
      id,
      username,
      profileImageUrl
    }, process.env.SECRET_KEY)
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    })
  } catch (error) {
    if (error.code === 11000) {
      error.message = 'Sorry, that username is taken';
    }
    return next({
      status: 400,
      message: error.message
    });
  }
}

exports.login = async function (req, res, next) {
  try {
    let user = await db.User.findOne({ email: req.body.email })
    let { id, username, profileImageUrl } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign({
        id,
        username,
        profileImageUrl
      }, process.env.SECRET_KEY);
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token
      })
    } else {
      return next({
        status: 400,
        message: "invalid Email/Password"
      })
    }
  } catch (error) {
    next({
      status: 400,
      message: "invalid Email/Password"
    });
  }

}