"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
const { BlogCategory } = require("../models/blogCategory.model");
// Call Models:
// console.log(typeof this.BlogCategory)
/* ------------------------------------------------------- */
// BlogCategory Controller:
// "/blog/category/id"
module.exports.blogCategory = {
  list: async (req, res) => {
    const data = await BlogCategory.find();
    //    const data = await BlogCategory.find({});
    res.send({
      result: data,
    });
  },

  // CRUD ->

  create: async (req, res) => {
    const result = await BlogCategory.create(req.body);

    res.send({
      result,
    });
  },

  read: async (req, res) => {
    // findOne({filter},{query},{options})
    //const id=req.params.categoryId
    //const result = await BlogCategory.findOne({ _id: req.params.categoryId },{_id:0,name:1});
    const result = await BlogCategory.findOne(
      { _id: req.params.categoryId },
      { _id: 0, name: 1 }
    );
    res.send({
      isError: false,
      result,
    });
  },

  update: async (req, res) => {
    //updateOne({filter},{update},{options})
    //! findByIdAndUpdate
    // const updatedUser = await User.findByIdAndUpdate(
    //   "64f8b0c9e9f8d7369c3c4f31", // _id
    //   { name: "Veli" },
    //   { new: true } // Güncellenmiş belgeyi döndür
    // );

    //matchedCount:0,1,2   modifiedCount=0,1
    const result = BlogCategory.updateOne(
      { _id: req.params.categoryId },
      req.body
    );
    if (result.matchedCount === 0) {
      // throw new CustomError("No matching documents found",404)
      return res.status(404).send("No matching documents found");
    }
    res.send({
      isError: false,
      result,
      updated: await BlogCategory.findOne({ _id: req.params.categoryId }),
    });
  },

  delete: async (req, res) => {
    const result = await BlogCategory.deleteOne({ _id: req.params.categoryId });
    //deletedCount
    if (result.deletedCount === 0) {
      // throw new CustomError("No matching documents found",404)
      return res.status(404).send("No matching documents found");
    }
    res.send({
      result,
    });
  },
};

/* ------------------------------------------------------- */
