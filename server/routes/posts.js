const express = require('express');
const router = express.Router({ mergeParams: true });
const { createPost } = require('../handlers/posts');

router.route('/').post(createPost)

module.exports = router;