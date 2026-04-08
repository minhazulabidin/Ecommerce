exports.apiResponse = (statusCode, res, message, data) => {
   return res.status(statusCode).json({
        statusCode,
        success: statusCode >= 400 ? false : true,
        message: message,
        data: data
    })
}