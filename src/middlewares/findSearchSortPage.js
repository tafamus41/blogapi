"use strict";
/* -------------------------------------------------------
    EXPRESSJS 
------------------------------------------------------- */
// Middleware: Filter Search Sort Pagination


module.exports = async (req, res, next) => {

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
    // const data = await BlogPost.find({ ...filter, ...search }).sort(sort).limit(limit).skip(skip).populate(['userId', 'categoryId'])
    // const data = await BlogPost.find({ ...filter, ...search }).sort(sort).limit(limit).skip(skip).populate(['userId']).populate(['categoryId'])

    // GetModelList
    res.getModelList = async function (Model, populate = null) {

        return await Model.find({ ...filter, ...search }).sort(sort).limit(limit).skip(skip).populate(populate)

    }

    // GetModelListDetails
    res.getModelListDetails = async function (Model) {

        const data = await Model.find({ ...filter, ...search })

        let details = {
            filter,
            search,
            sort,
            skip,
            limit,
            page,
            pages: {
                previous: (page > 1 ? page - 1 : false),
                current: page,
                next: (page + 1),
                total: Math.ceil(data.length / limit)
            },
            totalRecords: data.length
        }
        if (details.pages.next > details.pages.total) details.pages.next = false
        if (details.totalRecords <= limit) details.pages = false

        return details

    }

    next()

}