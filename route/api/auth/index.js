const express = require('express');
const { signupController } = require('../../../controllers/auth.controller');
const router = express.Router();

//localhost:8080/api/v1/auth/signup
router.post('/signup', signupController)

module.exports = router;