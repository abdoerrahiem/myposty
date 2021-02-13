const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()

dotenv.config({ path: './config/config.env' })

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.send('API running...'))

app.use('/api/users', require('./routes/users'))
app.use('/api/posts', require('./routes/posts'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server terhubung di port ${PORT}`))
