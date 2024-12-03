"use strict";
/* -------------------------------------------------------
    EXPRESSJS - Error Handler 
------------------------------------------------------- */

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || res.statusCode || 500;

  res.status(statusCode).send({
    isError: true, // special data
    message: err.message, // error string message
    cause: err.cause, // error option cause
    // stack: err.stack, // error details
  });
};
