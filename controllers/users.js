const userRouter = require('express').Router()
const { Op } = require('sequelize')

const { User, Blog, Reading } = require('../models')

userRouter.get('/', async (req, res) => {
  const users = await User.findAll({ include: { model: Blog } })
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

userRouter.get('/:id', async (req, res) => {
  let read = {
    [Op.in]: [true, false]
  }
  if (req.query.read) {
    read = req.query.read === 'true'
  }
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: [''] },
    include: [{
      model: Blog,
      as: 'readings',
      attributes: { exclude: ['userId'] },
      through: {
        attributes: ['id', 'read'],
        where: {
          read
        }
      },
    }],
    rejectOnEmpty: true
  })
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