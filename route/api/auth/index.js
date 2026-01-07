const express = require('express');
const router = express.Router();

//localhost:8080/api/v1/api/auth/signup

router.post('/signup', (async (req, res) => {
    res.send("signup")
}));

module.exports = router; 