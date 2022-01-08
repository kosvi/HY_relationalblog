const Blog = require('./blog')
const User = require('./user')
const Reading = require('./reading')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Reading, as: 'readings' })
Blog.belongsToMany(User, { through: Reading })

// Blog.sync({ alter: true })
// User.sync({ alter: true })

module.exports = {
  Blog, User, Reading
}