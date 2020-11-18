const express = require('express');
require('dotenv').config();
const app = express();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const { loginRequired, ensureCorrectUser } = require('./middleware/auth');
const db = require('./models');
const cookieParser = require('cookie-parser');
const path = require('path');

app.use(bodyParser.json());
app.use('/public', express.static('public'));
app.use(cookieParser())

const PORT = process.env.PORT || 4001;

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

app.use(express.static(path.join(__dirname, '/../client/build')))

app.get('*', (req, res) => {
  console.log('in here you little peace of shit')
  res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'));
})

app.use(function (req, res, next) {
  let error = new Error('Not Found');
  error.status = 404;
  next(error);
})

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));