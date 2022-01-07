const userRouter = require('express').Router()

const { User } = require('../models')

userRouter.get('/', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

userRouter.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

userRouter.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username }, rejectOnEmpty: true })
  if (!req.body.name) {
    throw new Error('no name given!')
  }
  user.name = req.body.name
  user.save()
  res.json(user)
})

userRouter.get('/me', async (req, res) => {
  if (!req.userId) {
    throw new Error('not logged in')
  }
  const user = await User.findOne({ where: { id: req.userId }, rejectOnEmpty: true })
  res.json(user)
})

module.exports = userRouter