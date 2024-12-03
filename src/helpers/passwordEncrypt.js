"use strict";
// Password Encrypt (PBKDF2 Method):
// https://nodejs.org/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest
/* -------------------------------------------------------
  EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
// passwordEncrypt():

const crypto = require("node:crypto");

//! Alternatifi bcrypt

const paswordEncypt = function (password) {
  //! const salt = crypto.randomBytes(16).toString("hex");
  //loopCount (iteration count) için 10,000 makul bir başlangıç noktasıdır
  //charCount (key length) için 32 (256-bit) yeterlidir.
  const salt = process.env.SECRET_KEY;
  const iterations = 10_000;
  const keyLength = 32;
  const encType = "sha512"; //Secure Hash Algorithm

  const hash = crypto
    .pbkdf2Sync(password, salt, iterations, keyLength, encType)
    .toString("hex");
  return hash;
};

const verifyPassword = (password, hash) => {
  const salt = process.env.SECRET_KEY;
  const iterations = 10_000;
  const keyLength = 32;
  const newHash = crypto
    .pbkdf2Sync(password, salt, iterations, keyLength, "sha512")
    .toString("hex");

  return newHash === hash;
};

module.exports = paswordEncypt;
