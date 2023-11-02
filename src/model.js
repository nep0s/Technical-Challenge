const Sequelize = require('sequelize');
const db = require('./db');

const Transfer = db.define('transfers',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  transferCode: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  retries: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Transfer;