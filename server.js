const mongoose = require('mongoose');
const app = require('./app');
const { DB_HOST, PORT } =require("./config");

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, (error) => {
      if (error) {
        console.log("Happened error: ", error);
        process.exit(1);
      } else {
        console.log(`Server running. Use our API on port: ${PORT}`);
      }
    });
  })
  .catch((err) => {
    console.error("Error with connect to database", err)
    process.exit(1);
  });
