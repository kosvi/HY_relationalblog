const errorHandler = (error, req, res, next) => {
  console.error("ERROR:", error.name)
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: error.message })
  }
  if (error.name === 'SequelizeEmptyResultError') {
    return res.status(404).json({ error: 'not found' })
  }
  if (error.name === 'Error') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

module.exports = {
  errorHandler
}