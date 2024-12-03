"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const mongoose = require("mongoose");
const paswordEncypt = require("../helpers/passwordEncrypt");

/* ------------------------------------------------------- */
// BlogPost Schema:
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required"], //required:true
      //! 1.yöntem
      // validate:(email)=>{
      //   return email.includes("@") && email.includes(".")
      // }
      //!2. yöntem
      // validate: (email)=>  email.includes("@") && email.includes(".")
      //! 3.yöntem
      // validate: [
      //   (email) => {
      //     console.log("this", this);
      //     return email.includes("@") && email.includes(".");
      //   },
      //   "Email format is incorrect",
      // ],
      //! 5. yöntem
      validate: [
        function (email) {
          // console.log("this", this);
          return email.includes("@") && email.includes(".");
        },
        "Email format is incorrect",
      ],
      //! 4.yöntem
      // validate:{
      //   validator:(email)=>{
      //       return email.includes("@") && email.includes(".")
      //      },
      //      message:"Email format is incorrect"
      // }
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"], //required:true
      set: (password) => paswordEncypt(password),
      //set:paswordEncypt
      // validate: [
      //   function (password) {

      //     console.log(password);
      //     if (password.length < 8) return false;
      //     else {
      //       const hash= paswordEncypt(password)
      //       this.password=hashed
      //       return true};
      //   },
      //   "Email format is incorrect",
      // ],
      // validate: [
      //   function (password) {

      //     console.log(password);
      //     if (password.length < 8) return false;
      //     else return true;
      //   },
      //   "Email format is incorrect",
      // ],
    },
    firstname: String,
    lastname: String,
  },
  {
    collection: "users",
    timestamps: true,
  }
);

module.exports = {
  User: mongoose.model("User", UserSchema),
};

/* ------------------------------------------------------- */
