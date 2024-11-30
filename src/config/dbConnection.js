"use strict";

/* -------------------------------------------------------------------------- */
/*                    EXPRESSJS-BLOG Project with Mongoose                    */
/* -------------------------------------------------------------------------- */

const mongoose = require("mongoose");
const { CustomError } = require("../errors/customError");

/* -------------------------------------------------------------------------- */
const dbConnection = () => {
    if(!process.env.MONGODB_URI){
        throw new CustomError("mongodb_uri is neccessary")
    }
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connection is succesfull")
  } catch (error) {
    console.log("Database connection error")
  }
};

/* -------------------------------------------------------------------------- */
module.exports=dbConnection
