exports.apiResponse = (statusCode, res, message, data) => {
    res.status(statusCode).json({
        success: statusCode >= 400 ? false : true,
        message: message,
        data: data
    })
}