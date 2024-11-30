"use strict";

/* -------------------------------------------------------------------------- */
/*                    EXPRESSJS-BLOG Project with Mongoose                    */
/* -------------------------------------------------------------------------- */

const mongoose = require("mongoose");
const { CustomError } = require("../errors/customError");

/* -------------------------------------------------------------------------- */
const dbConnection = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {}
};
