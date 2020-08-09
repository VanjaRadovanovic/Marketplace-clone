const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/marketplace', {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  autoIndex: true
});

module.exports.User = require('./user');
module.exports.Post = require('./posts');
