const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => console.log('Database connection successful'))
  .then(() => app.listen(3000, () =>
    console.log("Server running. Use our API on port: 3000")))
  .catch((err) => {
    console.error(err.message)
    process.exit(1)
  });
