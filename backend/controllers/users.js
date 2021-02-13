const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../config/db')

// Register user
exports.register = async (req, res) => {
  const { name, email, password } = req.body

  const existingUser = await db('users').where({ email }).first()
  if (existingUser)
    return res.status(400).json({
      success: false,
      message: 'Email telah digunakan.',
    })

  const salt = bcrypt.genSaltSync(10)
  const passwordHashed = bcrypt.hashSync(password, salt)

  const register = await db('users').insert({
    name,
    email,
    password: passwordHashed,
  })

  const registeredUser = await db('users').where({ id: register }).first()

  res.json({
    success: true,
    message: 'Pendaftaran berhasil.',
    data: registeredUser,
  })
}

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body

  const existedUser = await db('users').where({ email }).first()

  if (!existedUser)
    return res.status(404).json({
      success: false,
      message: 'Akun tidak ditemukan.',
    })

  const passwordMatched = await bcrypt.compare(password, existedUser.password)

  if (!passwordMatched)
    return res.status(401).json({
      success: false,
      message: 'Email dan password tidak cocok.',
    })

  const token = jwt.sign(
    {
      id: existedUser.id,
      email: existedUser.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  )

  res.status(200)
  res.json({ success: true, message: 'Login berhasil.', token })
}

// Get user
exports.getUser = async (req, res) => {
  const { id } = req.params

  const user = await db('users').where('id', id).first()
  if (!user)
    return res.status(404).json({
      success: false,
      message: 'Akun tidak ditemukan.',
    })

  res.json({ success: true, data: user })
}

// Get current user
exports.getCurrentUser = async (req, res) => {
  const user = await db('users').where('id', req.user.id).first()
  if (!user)
    return res.status(404).json({
      success: false,
      message: 'Akun tidak ditemukan.',
    })

  res.json({ success: true, data: user })
}

// Update user
exports.updateUser = async (req, res) => {
  const { name, email } = req.body

  await db('users').where('id', req.user.id).update({
    name,
    email,
  })

  const updatedUser = await db('users').where('id', req.user.id).first()

  res.json({
    success: true,
    message: 'Akun berhasil diupdate.',
    data: updatedUser,
  })
}
