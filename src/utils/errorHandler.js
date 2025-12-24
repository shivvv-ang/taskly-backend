import log from "./logHandler.js";

const errorHandler = (err, req, res, next) => {

    log.error("Api Error!", err.message);

    //controlled Errors sent to client

    if (err.statusCode && err.statusCode >= 400 && err.statusCode < 500) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors || []
        })
    }

    //Server side Unexpected Errors
    res.status(500).json({
        success: false,
        message: "Something Went Wrong, Please Try Again Later..!",
    })
}

export default errorHandler;