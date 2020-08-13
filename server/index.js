const express = require('express');
require('dotenv').config();
const app = express();
const bcript = require('bcrypt');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const { loginRequired, ensureCorrectUser } = require('./middleware/auth');
const db = require('./models');

app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

app.use('/api/auth', authRoutes);

app.use('/api/users/:id/posts', loginRequired, ensureCorrectUser, postRoutes);

app.use('/api/posts', async function (req, res, next) {
  try {
    let posts = await db.Post.find().populate('user', { username: true, profileImageUrl: true });
    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
})

app.use(function (req, res, next) {
  let error = new Error('Not Found');
  error.status = 404;
  next(error);
})

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));