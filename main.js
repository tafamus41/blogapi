"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const express = require("express");
// Catch error from async:
require("express-async-errors");
const app = express(); //singleton

require("dotenv").config();
const PORT = process.env.PORT || 8000;

// Accept JSON:
app.use(express.json());
// DB CONNECTION with normal function
require("./src/config/dbConnection")();
// DB CONNECTION with with class
//require("./src/config/dbConnection");

/* ------------------------------------------------------- */
app.use("/blog/category", require("./src/routes/blogCategory.router"));
app.use("/blog/post", require("./src/routes/blogPost.router"));
app.use("/user", require("./src/routes/user.router"));
app.all("/", (req, res) => {
  res.send("WELCOME TO BLOG API");
});

/* ------------------------------------------------------- */
// Routes:

/* ------------------------------------------------------- */
app.use("*", (req, res) => {
  res.status(404).send({ isError: true, message: "The route is NOT FOUND" });
});

// Catch Errors:
app.use(require("./src/middlewares/errorHandler"));

/* ------------------------------------------------------- */

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
