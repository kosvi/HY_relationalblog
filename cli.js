require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection succesfull')
    const blogs = await sequelize.query('SELECT * FROM blogs', { type: QueryTypes.SELECT })
    blogs.map(b => console.log(`${b.author}: '${b.title}', ${b.likes} likes`))
    sequelize.close()
  } catch (error) {
    console.error('Connection failed', error)
  }
}

main()