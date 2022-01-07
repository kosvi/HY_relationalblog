const { Blog } = require('../models')
const { sequelize } = require('../utils/db')

const authorRouter = require('express').Router()

authorRouter.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('*')), 'blogs'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    ],
    group: 'author',
    order: [
      [sequelize.fn('SUM', sequelize.col('likes')), 'DESC']
    ]
  })
  //  console.log(JSON.stringify(blogs, null, 2))
  res.json(blogs)
})

module.exports = authorRouter