const { constants } = require('../constants');

const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode :500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
          res.json({title :"validation failed",message: err.message , stackTrace: err.stack});
          break;

        case constants.UNAUTHERIZED:
          res.json({title :"unautherised",message: err.message , stackTrace: err.stack});

        case constants.NOT_FOUND:
          res.json({title :"not found",message: err.message , stackTrace: err.stack});

        case constants.FORBIDDEN:
          res.json({title :"forbidden",message: err.message , stackTrace: err.stack});
          
        case constants.SERVER_ERROR:
          res.json({title :"server error",message: err.message , stackTrace: err.stack});

        default :
            console.log("No error all goood server");
          break;   

    }
};

module.exports = errorHandler;