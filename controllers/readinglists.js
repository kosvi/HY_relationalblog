const readingRouter = require('express').Router()
const { Reading } = require('../models')
const { authenticate } = require('../utils/middleware')

readingRouter.post('/', async (req, res) => {
  const body = {
    userId: req.body.user_id,
    blogId: req.body.blog_id
  }
  const reading = await Reading.create(body)
  res.json(reading)
})

readingRouter.put('/:id', authenticate, async (req, res) => {
  if (!req.body.read) {
    throw new Error('malformed request')
  }
  const reading = await Reading.findByPk(req.params.id, { rejectOnEmpty: true })
  if (reading.userId !== req.decodedToken.id) {
    throw new Error('Forbidden')
  }
  reading.read = true
  await reading.save()
  res.json(reading)
})

module.exports = readingRouter