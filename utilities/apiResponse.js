exports.apiResponse = (res, statusCode, message, data) => {
    return res.status(statusCode).json({
        success: statusCode >= 400 ? false : true,
        message: message,
        data: data
    })
}