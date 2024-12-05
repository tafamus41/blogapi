"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const { User } = require("../models/user.model");

const passwordEncrypt = require('../helpers/passwordEncrypt');

module.exports = {

    login: async (req, res) => {

        const { email, password } = req.body

        if (email && password) {
            // Email ve Password gönderildi.

            const user = await User.findOne({ email })

            if (user) {
                // User OK.

                if (user.password == passwordEncrypt(password)) {
                    // Password OK.

                    /* SESSION */
                    // req.session = {
                    //     email: user.email,
                    //     password: user.password,
                    // }
                    // req.session.email = user.email
                    req.session._id = user._id
                    req.session.password = user.password
                    /* SESSION */

                    /* COOKIE */
                    // Beni Hatırla:
                    if (req.body?.remindMe) {
                        req.session.remindMe = true
                        // Set maxAge to 3 days:
                        req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3
                    }
                    /* COOKIE */

                    res.status(200).send({
                        error: false,
                        message: 'Login OK',
                        user
                    })

                } else {
                    res.errorStatusCode = 401
                    throw new Error('Login parameters are not true.')
                }
            } else {
                res.errorStatusCode = 401
                throw new Error('This user not found.')
            }
        } else {
            res.errorStatusCode = 401
            throw new Error('Email and password are required.')
        }

    },

    logout: async (req, res) => {
        
        // Session/Cookie verilerini silmek için "null" eşitlemek yeterli.
        req.session = null

        res.status(200).send({
            error: false,
            message: 'Logout OK'
        })
    },

}

/* ------------------------------------------------------- */