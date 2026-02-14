const { apiResponse } = require("./apiResponse");


exports.globalError = (error, req, res, next) => {
    if (error.name === "ValidationError") {
        let errors = {};
        Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
        });
        apiResponse(res, 400, Object.values(errors)[0])
    } else if (error.message) {
        apiResponse(res, 500, error.message)
    } else {
        apiResponse(res, 500, "something went wrong")
    }
}