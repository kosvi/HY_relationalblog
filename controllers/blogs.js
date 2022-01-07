const blogsRouter = require('express').Router()
const { Blog, User } = require('../models')
const { authenticate } = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

blogsRouter.post('/', authenticate, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id, { rejectOnEmpty: true })
  const blog = await Blog.create({ ...req.body, userId: user.id })
  res.json(blog)
})

blogsRouter.delete('/:id', authenticate, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    if (blog.userId !== req.decodedToken.id) {
      res.status(403).json({ error: 'Forbidden' })
    } else {
      await blog.destroy()
    }
  }
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id, { rejectOnEmpty: true })
  blog.likes = req.body.likes
  await blog.save()
  res.json(blog)
})

module.exports = blogsRouter