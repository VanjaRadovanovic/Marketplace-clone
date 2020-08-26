const express = require('express');
const router = express.Router({ mergeParams: true });
const { createPost, getPost, deletePost } = require('../handlers/posts');
const db = require('../models');
const multer = require('multer');
const uuidv4 = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/');
  },
})

const upload = multer({ storage: storage })

router.post('/', upload.array('imageUrl'), createPost);

router.get('/allmessages', async (req, res) => {
  try {
    let posts = await db.Post.find().populate('user', {
      username: true,
      profileImageUrl: true,
      email: true
    });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
})

router.get('/:message_id', getPost);

router.delete('/:message_id', deletePost);



module.exports = router;