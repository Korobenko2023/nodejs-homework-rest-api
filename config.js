require("dotenv").config()

const { DB_HOST = '', DB_HOST_TEST = '', PORT = 3000, SECRET_KEY = '' } = process.env;

module.exports = { DB_HOST, DB_HOST_TEST, PORT, SECRET_KEY };