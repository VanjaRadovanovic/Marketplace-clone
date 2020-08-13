const express = require('express');
const router = express.Router();
const { signup, login } = require('../handlers/auth');
const db = require('../models')

router.post('/signup', signup);

router.post('/signin', login);

router.get('/otherRegisterData', async (req, res) => {
  try {
    const users = await db.User.find();
    const data = { usernames: [], emails: [] };
    users.forEach((val) => {
      data.usernames.push(val.username);
      data.emails.push(val.email);
    })
    res.status(200).json(data);
  } catch (error) {
    next(error)
  }
})

module.exports = router;