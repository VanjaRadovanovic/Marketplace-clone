const express = require('express');
const router = express.Router({ mergeParams: true });
const { createPost, getPost, deletePost } = require('../handlers/posts');

router.post('/', createPost);

router.get('/:message_id', getPost);

router.delete('/:message_id', deletePost);

module.exports = router;