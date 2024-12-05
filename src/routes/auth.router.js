"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const router = require("express").Router();

// Call Controllers:
const { login, logout } = require("../controllers/auth.controller");
/* ------------------------------------------------------- */

// URL: /auth/login
router.route("/login").post(login)

// URL: /auth/logout
// router.route("/logout").get(logout)
router.route("/logout").all(logout)

module.exports = router;
/* ------------------------------------------------------- */
