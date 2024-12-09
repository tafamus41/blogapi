"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const mongoose = require("mongoose");
const { CustomError } = require("../errors/customError");

//'mongodb://localhost:27017/blogAPI'
/*------------------------------------------------------ */
const dbConnection = async () => {
  if (!process.env.MONGODB_URI) {
    throw new CustomError("mongodb_uri is necessary");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connection is succesfull");
  } catch (error) {
    console.log("Database connection error");
    throw new CustomError("Failed to connect to the database", 500);
  }
};
/*------------------------------------------------------
//! # private, _ ile başlayan dışarıdan erişilmemeli
class DatabaseConnection {
    constructor() {
      this.#_connect();
    }
  
    #_connect() {
      if (!process.env?.MONGODB)
        throw new CustomError("mongodb uri is necessary", 500);
      mongoose
        .connect(process.env?.MONGODB)
        .then(() => {
          console.log("Database connection successful");
        })
        .catch((err) => {
          console.error("Database connection error");
        });
    }
  }

  module.exports=new DatabaseConnection()
/*------------------------------------------------------*/
module.exports = dbConnection;
