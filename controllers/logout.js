const logoutRouter = require('express').Router()
const { Session } = require('../models')
const { authenticate } = require('../utils/middleware')

logoutRouter.delete('/', authenticate, async (req, res) => {
  await Session.destroy({ where: { userId: req.decodedToken.id } })
  res.status(200).json({ msg: 'logged out' })
})

module.exports = logoutRouter
