const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    // set status to 404
    res.status(404);
    // pass in error
    next(error);
}

const errorHandler = (err, req, res, next) => {
    // we may get a 200 even though an error => 500 server error
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        // only show stack at dev mode
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    })
}

export { notFound, errorHandler };