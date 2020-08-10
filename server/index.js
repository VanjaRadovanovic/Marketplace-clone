const express = require('express');
require('dotenv').config();
const app = express();
const bcript = require('bcrypt');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const { loginRequired, ensureCorrectUser } = require('./middleware/auth');

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use('/api/auth', authRoutes);

app.use('/api/users/:id/posts', loginRequired, ensureCorrectUser, postRoutes);

app.use(function (req, res, next) {
  let error = new Error('Not Found');
  error.status = 404;
  next(error);
})

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));