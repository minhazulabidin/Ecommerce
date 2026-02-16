const { asyncController } = require("../utilities/asyncController");

exports.addCategoryController = asyncController(async (req, res) => {
    res.send('working...')
})