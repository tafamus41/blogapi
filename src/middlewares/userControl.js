"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
// Middleware: User check from session

const { User } = require("../models/user.model");

module.exports = async (req, res, next) => {

//   console.log('session:', req.session)
  
  // login olan user datasını buraya kaydedeceğiz.
  req.user = null

  if (req.session?._id) {

    const { _id, password } = req.session

    const user = await User.findOne({ _id })

    if (user && user.password == password) {
      
      // Login başarılı:
      // Session içindeki login datası başarılı ise user verisini req.user'a ata:
      req.user = user

    } else {

      req.user = null
      // Session'da hatalı veriler varsa session verisini sil:
      req.session = null

    }
  }

  next()

}