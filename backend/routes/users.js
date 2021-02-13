const router = require('express').Router()
const {
  register,
  loginUser,
  getCurrentUser,
  updateUser,
  getUser,
} = require('../controllers/users')
const auth = require('../middleware/auth')

router.route('/login').post(loginUser)
router.route('/auth').get(auth, getCurrentUser)
router.route('/').post(register).put(auth, updateUser)
router.route('/:id').get(getUser)

module.exports = router
