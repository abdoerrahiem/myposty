const router = require('express').Router()
const {
  createPost,
  getPosts,
  getPostsByUser,
  getPost,
  deletePost,
  updatePost,
  getMyPosts,
} = require('../controllers/posts')
const auth = require('../middleware/auth')

router.route('/me').get(auth, getMyPosts)
router.route('/').post(auth, createPost).get(getPosts)
router.route('/user/:id').get(getPostsByUser)
router.route('/:id').get(getPost).delete(auth, deletePost).put(auth, updatePost)

module.exports = router
