const db = require('../config/db')

// Create posts
exports.createPost = async (req, res) => {
  const { title, content, date } = req.body

  let post = await db('posts').insert({
    user: req.user.id,
    title,
    content,
    date,
  })

  post = await db('posts').where('id', post).first()

  res.status(201).json({
    success: true,
    message: 'Post berhasil ditambahkan.',
    data: post,
  })
}

// Get posts
exports.getPosts = async (req, res) => {
  const posts = await db('posts').join('users', { 'posts.user': 'users.id' })

  res.json({ success: true, count: posts.length, data: posts })
}

// Get posts by user
exports.getPostsByUser = async (req, res) => {
  const { id } = req.params

  const posts = await db('posts')
    .where('user', id)
    .join('users', { 'posts.user': 'users.id' })

  res.json({ success: true, count: posts.length, data: posts })
}

// Get my posts
exports.getMyPosts = async (req, res) => {
  const posts = await db('posts').where('user', req.user.id)

  res.json({ success: true, count: posts.length, data: posts })
}

// Get post
exports.getPost = async (req, res) => {
  const { id } = req.params

  const post = await db('posts').where({ id }).first()

  if (!post)
    return res.status(404).json({
      success: false,
      message: 'Post tidak ditemukan.',
    })

  res.json({ success: true, data: post })
}

// Delete post
exports.deletePost = async (req, res) => {
  const { id } = req.params

  const post = await db('posts').where({ id, user: req.user.id }).del()
  if (!post)
    return res.status(404).json({
      success: false,
      message: 'Post tidak ditemukan.',
    })

  res.json({ success: true, message: 'Post berhasil dihapus.' })
}

// Update post
exports.updatePost = async (req, res) => {
  const { id } = req.params
  const { title, content } = req.body

  let post = await db('posts').where({ id, user: req.user.id }).update({
    content,
    title,
  })

  if (!post)
    return res.status(404).json({
      success: false,
      message: 'Post tidak ditemukan.',
    })

  post = await db('posts').where({ id, user: req.user.id }).first()

  res.json({
    success: true,
    message: 'Post berhasil diupdate.',
    data: post,
  })
}
