const Blog = require('./blog')
const User = require('./user')
const Reading = require('./reading')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Reading, as: 'readings' })
Blog.belongsToMany(User, { through: Reading })

User.hasMany(Session)
Session.belongsTo(User)

// Blog.sync({ alter: true })
// User.sync({ alter: true })

module.exports = {
  Blog, User, Reading, Session
}