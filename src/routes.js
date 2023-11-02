const controller = require('./controller');
const router = require('express').Router();

router
  .get('/', () => {return 'Transfers Server'});

module.exports = router;