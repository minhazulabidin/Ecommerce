const express = require('express');
const { registration, login, allUserController } = require('../../../controllers/authController');
const { isAuthorize } = require('../../../middleware/isAuthorize');
const { isAuthorizeRole } = require('../../../middleware/isAuthorizeRole');
const router = express.Router()

router.post('/register', registration)

router.post('/login', login)

router.get('/allUsers', isAuthorize, isAuthorizeRole("admin"), allUserController)


module.exports = router;