const express = require('express');
const { registration, login, allUserController } = require('../../../controllers/authController');
const { isAuthorize } = require('../../../middleware/isAuthorize');
const { isAdminOrMarcentaizer } = require('../../../middleware/isAdminOrMarcentaizer');
const router = express.Router()

router.post('/register', registration)

router.post('/login', login)

router.get('/allUsers',
    isAuthorize,
    (req, res, next) => isAdminOrMarcentaizer(req, res, next, ["admin", "marcentaizer"]),
    allUserController)


module.exports = router;