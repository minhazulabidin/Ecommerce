const express = require('express');
const router = express.Router();
const auth = require('./auth');

//localhost:8080/api/v1/
router.use('/auth', auth)

module.exports = router;