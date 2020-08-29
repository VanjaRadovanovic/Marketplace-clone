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

router.put('/:messageId', upload.array('imageUrl'), async (req, res) => {
  try {
    let post = await db.Post.findById(req.params.messageId).populate('user', { username: true, profileImageUrl: true });
    const url = req.protocol + '://' + req.get('host');
    let images;
    if (req.body.convertedImageUrls.length > 10) {
      images = [req.body.convertedImageUrls];
    } else {
      images = req.body.convertedImageUrls;
    }
    console.log(images, 'images')
    req.files.forEach(val => images.push(url + '/public/' + val.filename))
    post.imageUrl = images;
    post.title = req.body.title;
    post.price = req.body.price;
    post.category = req.body.category;
    post.description = req.body.description;
    post.location = req.body.location;
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    console.log(err, 'ERROR')
  }
});

router.post('/add-bookmark', async (req, res) => {
  try {
    let user = await db.User.findById(req.params.id);
    user.bookmarks.push(req.body.postId);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err)
    next(err);
  }
})

router.post('/remove-bookmark', async (req, res) => {
  try {
    let user = await db.User.findById(req.params.id);
    let arr = user.bookmarks.filter(val => val.toString() !== req.body.postId.toString());
    user.bookmarks = arr;
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
})

router.get('/:message_id', getPost);

router.delete('/:message_id', deletePost);



module.exports = router;