const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const { User, Session } = require('../models')
const { PASSWORD, SECRET } = require('../utils/config')

loginRouter.post('/', async (req, res) => {
  const fullUser = await User.findOne({ where: { username: req.body.username }, rejectOnEmpty: true })
  const passwordCorrect = req.body.password === PASSWORD
  if (!passwordCorrect) {
    throw new Error('incorrect password')
  }
  if (fullUser.disabled) {
    throw new Error('account disabled')
  }
  const user = {
    username: fullUser.username,
    name: fullUser.name,
    id: fullUser.id,
    disabled: fullUser.disabled
  }
  const token = jwt.sign(user, SECRET)
  await Session.create({ userId: fullUser.id, token: token })
  res.status(200).send({ token, user })
})

module.exports = loginRouter
