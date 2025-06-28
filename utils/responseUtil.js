// utils/responseUtil.js

exports.successResponse = (res, data = {}, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        data
    });
};

exports.errorResponse = (res, error, statusCode = 500) => {
    return res.status(statusCode).json({
        success: false,
        message: error.message || 'Internal Server Error'
    });
};
