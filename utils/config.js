require('dotenv').config()

const PORT = process.env.PORT || 3001
const DATABASE_URL = process.env.DATABASE_URL
const PASSWORD = 'password'
const SECRET = process.env.SECRET

module.exports = {
  PORT,
  DATABASE_URL,
  PASSWORD,
  SECRET
}