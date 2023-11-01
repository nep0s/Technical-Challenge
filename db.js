const { Pool } = require('pg')
const pool = new Pool({
  host: 'db',
  port: 5431,
  user: 'user',
  password: 'admin',
  database: 'postgres_db'

})

module.exports = pool