const jwt = require('jsonwebtoken')
const db = require('../config/db')

const auth = async (req, res, next) => {
  let token = req.headers.authorization

  if (token && token.startsWith('Bearer')) {
    try {
      token = token.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await db('users').where({ id: decoded.id }).first()

      next()
    } catch (error) {
      res.status(401).json({ success: false, message: 'Token tidak valid.' })
    }
  } else {
    res.status(401).json({ success: false, message: 'Akses ditolak.' })
  }
}

module.exports = auth
