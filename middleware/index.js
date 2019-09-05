const ErrorModel = require('../models/error');

module.exports = {
    asyncErrorHandler: (fn) =>
        (req, res, next) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        },
    errorHandler: async (err, req, res, next) => {
        // set locals, only providing error in development
        console.log(err);
        if (err.name == 'CastError') {
            error_status = 404;
            error_meaning = "Page does not exist";
        } else {
            error_status = err.status;
            error_meaning = err.message;
        }

        await ErrorModel.create({
            reporter: req.user._id || null,
            detail: err.stack,
            error_status: error_status
        });

        // render the error page
        res.render('error', {
            error_status: error_status,
            error_meaning: error_meaning,
        });
    },
}
