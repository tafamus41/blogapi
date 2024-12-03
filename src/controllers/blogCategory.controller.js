"use strict";

/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
const { BlogCategory } = require("../models/blogCategory.model");
const { NotFoundError } = require("../errors/customError");
// Call Models:

/* ------------------------------------------------------- */
// BlogCategory Controller:
// "/blog/category/id"
module.exports.blogCategory = {
  list: async (req, res) => {
    //  const data = await BlogCategory.find({});
    const data = await BlogCategory.find();

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
    //! findOne({filter},{projection})   filter+projection
    //! findOne({filter},{projection}).limit(10)..sort({ createdAt: -1 }).skip(5)
    //const id=req.params.categoryId

    // Veride istenmeyen field varsa false yada 0 ile döndürülmeyebilir
    //const result = await BlogCategory.findOne({ _id: req.params.categoryId },{_id:0,name:1});
    const result = await BlogCategory.findOne(
      { _id: req.params.categoryId },
      { _id: 0, name: 1 }
    );
    if (!result) {
      throw new NotFoundError("No matching documents found");
    }
    res.send({
      isError: false,
      result,
    });
  },

  update: async (req, res) => {
    //updateOne({filter},{update},{options})
    //! findByIdAndUpdate=> findOne+updateOne
    // const updatedUser = await User.findByIdAndUpdate(
    //   "64f8b0c9e9f8d7369c3c4f31", // _id
    //   { name: "John" },
    //   { new: true } // Güncellenmiş belgeyi döndür
    // );

    //options
    //upsert: Belge bulunamazsa yeni bir belge oluşturur. (true veya false, varsayılan: false)
    const result = await BlogCategory.updateOne(
      { _id: req.params.categoryId },
      req.body
    );
    //matchedCount:0,1,2   modifiedCount=0,1  durumu
    //!güncellenmek istenen veri yoksa
    if (result.matchedCount === 0) {
      throw new NotFoundError("No matching documents found");
      // return res.status(404).send("No matching documents found");
    }
    //! güncellenmek istenen veri ama ama güncelleme yapılmadı
    if (result.matchedCount > 0 && result.modifiedCount === 0) {
      return res.status(200).send({ message: "Document already up-to-date." });
    }
    res.status(202).send({
      isError: false,
      result,
      new: await BlogCategory.findOne({ _id: req.params.categoryId }),
    });
  },

  delete: async (req, res) => {
    const result = await BlogCategory.deleteOne({ _id: req.params.categoryId });
    console.log(result);
    //deletedCount
    if (result.deletedCount === 0) {
      throw new NotFoundError("No matching documents found");
      // return res.status(404).send("No matching documents found");
    }
    //! 204 ile veri gönderilmez No_Content
    res.status(204).send({
      result,
    });
  },
};

/* ------------------------------------------------------- */
