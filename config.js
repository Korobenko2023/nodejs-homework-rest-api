require("dotenv").config()

const { DB_HOST = '', PORT = 3000 } = process.env;

module.exports = { DB_HOST, PORT };