const express = require('express');
const { registration, login, allUserController, verifyOtp, resentOtp } = require('../../../controllers/authController');
const { isAuthorize } = require('../../../middleware/isAuthorize');
const { isAuthorizeRole } = require('../../../middleware/isAuthorizeRole');
const router = express.Router()

// regeistration route
router.post('/register', registration)

// login route
router.post('/login', login)

// get all user route
router.get('/allUsers', isAuthorize, isAuthorizeRole("admin"), allUserController)

// verify otp route
router.post('/verifyOtp', verifyOtp)

// resent verify otp route
router.post('/resentVerifyOtp', resentOtp)


module.exports = router;