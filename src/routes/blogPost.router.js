"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const router = require("express").Router();

// Call Controllers:
const { blogPost } = require("../controllers/blogPost.controller");
/* ------------------------------------------------------- */

// URL: /blog ->
// /blog/post
// BlogPost
router.route("/").get(blogPost.list).post(blogPost.create);

router
  .route("/:postId")
  .get(blogPost.read)
  .put(blogPost.update)
  .patch(blogPost.update)
  .delete(blogPost.delete);

module.exports = router;
/* ------------------------------------------------------- */
