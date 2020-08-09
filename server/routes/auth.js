const express = require('express');
const router = express.Router();
const { signup, login } = require('../handlers/auth');

router.post('/signup', signup);

router.post('/signin', login);

module.exports = router;