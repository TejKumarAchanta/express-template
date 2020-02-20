const errorHandler = (err, req, res, next) => {

    console.log('errname', err.name, err.statusCode);

    res.status(err.statusCode || 500).json({
        error: true,
        message: err.message || "Internal Server Error"
    });
}


module.exports = errorHandler;