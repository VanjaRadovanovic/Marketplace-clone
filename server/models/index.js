const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect('mongodb+srv://Admin:paco12341@cluster0.jeksz.mongodb.net/Cluster0?retryWrites=true&w=majority', {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  autoIndex: true
});

module.exports.User = require('./user');
module.exports.Post = require('./posts');
