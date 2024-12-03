"use strict";

const mongoose = require("mongoose");
const { BadRequestError } = require("../errors/customError");

/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

module.exports = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new BadRequestError("Invalid MongoDB ID");
  }
  next();
};

//router.params("/categoryId",idValidation)
/* module.exports = (req, res, next, id) => {
  console.log(id, "------");
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError("Invalid MongoDB ID");
  }
  next();
};
 */
