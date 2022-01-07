const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')

const errorHandler = (error, req, res, next) => {
  console.error("ERROR:", error.name)
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: error.message })
  }
  if (error.name === 'SequelizeEmptyResultError') {
    return res.status(404).json({ error: 'not found' })
  }
  if (error.name === 'SequelizeDatabaseError') {
    return res.status(500).json({ error: 'something went wrong with the database' })
  }
  if (error.name === 'Error') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}


const authenticate = async (req, res, next) => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    try {
      const token = jwt.verify(auth.substring(7), SECRET)
      if (token && token.id) {
        req.decodedToken = token
      }
    } catch (error) {
      console.log('Authenticate: ', error)
      throw new Error('Invalid token')
    }
  } else {
    throw new Error('not logged in')
  }
  next()
}



module.exports = {
  errorHandler,
  authenticate
}