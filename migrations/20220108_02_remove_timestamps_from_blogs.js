const { DataTypes } = require('sequelize')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.removeColumn('blogs', 'created_at')
    await queryInterface.removeColumn('blogs', 'updated_at')
  },
  down: async (queryInterface) => {
    await queryInterface.addColumn('blogs', 'created_at', {
      type: DataTypes.DATE,
      allowNull: false
    })
    await queryInterface.addColumn('blogs', 'updated_at', {
      type: DataTypes.DATE,
      allowNull: false
    })
  }
}