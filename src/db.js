const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  {
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },

);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error(`ble to connect to the database: ${sequelize.getDatabaseName()}`, error);
  }
})()

module.exports = sequelize

