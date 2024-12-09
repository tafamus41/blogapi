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

        //* FILTERING - SEARCHING - SORTING - PAGINATION *//

        // console.log(req.query)

        // FILTERING:
        // URL?filter[fieldName1]=value1&filter[fieldName2]=value2
        const filter = req.query?.filter || {}
        // console.log(filter)
        // { userId: '6751e0e727ae5347fc01afd7', title: 'test 5 title' }

        // SEARCHING:
        // URL?search[fieldName1]=value1&search[fieldName2]=value2
        const search = req.query?.search || {}
        // console.log(search)
        // https://www.mongodb.com/docs/manual/reference/operator/query/regex/
        // { title: { $regex: "test 5 title", $options: "i" } }
        for (let key in search) {
            // search[key] = { $regex: search[key] } // Case-sensitive
            search[key] = { $regex: search[key], $options: "i" } // Case-insensitive
        }
        // console.log(search)

        // SORTING:
        // URL?sort[fieldName1]=asc&sort[fieldName2]=desc (asc: A-Z, desc: Z-A)
        // Cancelled: URL?sort[fieldName1]=1&sort[fieldName2]=-1 // Mongoose 8.0 > deprecated
        const sort = req.query?.sort || {}
        // console.log(sort)

        // PAGINATION:
        // URL?page=3&limit=20&skip=10
        // LIMIT:
        let limit = Number(req.query?.limit)
        limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE || 20)
        // console.log(limit, typeof limit)
        // PAGE:
        let page = Number(req.query?.page)
        page = page > 0 ? page : 1
        // console.log(page)
        // SKIP:
        let skip = Number(req.query?.skip)
        skip = skip > 0 ? skip : ((page - 1) * limit)
        // console.log(page, skip, limit)

        // const data = await BlogPost.find().populate("categoryId");
        // LIMIT 10, 20 = LIMIT skip() limit()
        // const data = await BlogPost.find({ ...filter, ...search }).sort(sort).limit(limit).skip(skip)
        const data = await BlogPost.find({ ...filter, ...search }).sort(sort).limit(limit).skip(skip).populate(['userId', 'categoryId'])
        // const data = await BlogPost.find({ ...filter, ...search }).sort(sort).limit(limit).skip(skip).populate(['userId']).populate(['categoryId'])

        res.send({
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
