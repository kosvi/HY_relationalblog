const errorHandler = (error, req, res, next) => {
  console.error("ERROR:", error.name)
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: 'malformed request' })
  }
  if (error.name === 'SequelizeEmptyResultError') {
    return res.status(404).json({ error: `blog not found` })
  }
  next(error)
}

module.exports = {
  errorHandler
}