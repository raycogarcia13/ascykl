const ErrorHandler = require("../utils/errorHandler");

module.exports = (err ,req ,res ,next)=>{
    err.statusCode = err.statusCode || 500;
// if(process.env.NODE_ENV === 'DEVELOPMENT'){
//     res.status(err.statusCode).json({
//         status:'failed',
//         error:err,
//         message:err.message,
//         satck:err.stack
//     })
// }

// if(process.env.NODE_ENV === 'PRODUCTION'){
    let error = {...err}
    error.message = err.message
    
    // mongoose dulicated 
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        error = new ErrorHandler(message,400)
    }

    // handling wrong JWT
    if(err.name === 'JsonWebTokenError'){
        const message = 'Json Web Token is invalid. Try again !!!';
        error = new ErrorHandler(message,400)
    }

    // expires JWT
    if(err.name === 'TokenExpiredError'){
        const message = 'Json Web Token is expired. Try again !!!';
        error = new ErrorHandler(message,400)
    }


    // wrong mongoose object ID error
    if(err.name == 'CastError'){
        const message = `Resources not found. Invalid ${err.path}`
        error = new ErrorHandler(message, 400);  
    }
    //handliing mongoose validations
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(value=>value.message);
        error = new ErrorHandler(message,400);
    }
    res.status(error.statusCode).json({
        status:'failed',
        error:error.message || 'Internal Server Error',
        stack:err.stack
    })
// }
}