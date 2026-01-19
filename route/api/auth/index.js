const express = require('express');
const { signupController, loginController } = require('../../../controllers/auth.controller');

const router = express.Router();

//localhost:8080/api/v1/auth/signup
router.post('/signup', signupController)
router.post("/login",loginController)


module.exports = router;