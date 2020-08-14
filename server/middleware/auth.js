const jwt = require('jsonwebtoken');

exports.loginRequired = function (req, res, next) {
  try {
    console.log(req.headers, 'printing headers')
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded) {
        return next();
      } else {
        return next({
          status: 401,
          message: 'Please login first'
        })
      }
    })
  } catch (error) {
    next({
      status: 401,
      message: error.message
    });
  }
}

exports.ensureCorrectUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded && decoded.id === req.params.id) {
        return next();
      } else {
        return next({
          status: 401,
          message: 'Unauthorized'
        })
      }
    })
  } catch (error) {
    next({
      status: 401,
      message: 'Unauthorized'
    })
  }
}