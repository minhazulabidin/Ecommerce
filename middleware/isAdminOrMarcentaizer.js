const { apiResponse } = require("../utilities/apiResponse")

exports.isAdminOrMarcentaizer = (req, res, next, role) => {
    if (role.includes(req.session.user.role)) {
        next();
    } else {
        return apiResponse(400, res, "Access denied")
    }
}