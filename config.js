require("dotenv").config()

const { DB_HOST = '', PORT = 3000, SECRET_KEY = '' } = process.env;

module.exports = { DB_HOST, PORT, SECRET_KEY };