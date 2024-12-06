"use strict";

/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

// Call Models:
const { BlogPost } = require("../models/blogPost.model");
const { NotFoundError } = require("../errors/customError");
/* ------------------------------------------------------- */

module.exports.blogPost = {

    list: async (req, res) => {

        // Moved to middleware:
        const data = await res.getModelList(BlogPost, ['userId', 'categoryId'])

        res.send({
            details: await res.getModelListDetails(BlogPost),
            result: data,
        });
    },

    // CRUD ->

    create: async (req, res) => {

        // Login olmuşsa, userId'yi req.user'dan alalım. (session)
        if (req.user) req.body.userId = req.user._id

        const result = await BlogPost.create(req.body);

        res.send({
            result,
        });
    },

    read: async (req, res) => {
        const result = await BlogPost.findOne({ _id: req.params.postId });
        if (!result) {
            throw new NotFoundError("No matching documents found");
        }
        res.send({
            isError: false,
            result,
        });
    },

    update: async (req, res) => {
        const result = await BlogPost.updateOne(
            { _id: req.params.postId },
            req.body
        );

        //!güncellenmek istenen veri yoksa
        // if (result.matchedCount === 0) {
        //   throw new NotFoundError("No matching documents found");
        //   // return res.status(404).send("No matching documents found");
        // }
        // //! güncellenmek istenen veri ama ama güncelleme yapılmadı
        // if (result.matchedCount > 0 && result.modifiedCount === 0) {
        //   return res.status(200).send({ message: "Document already up-to-date." });
        // }
        res.status(202).send({
            isError: false,
            result,
            new: await BlogPost.findOne({ _id: req.params.postId }),
        });
    },

    delete: async (req, res) => {
        const result = await BlogPost.deleteOne({ _id: req.params.postId });
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
