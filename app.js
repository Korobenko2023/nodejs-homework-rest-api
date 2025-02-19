const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const contactsRouter = require("./routes/contactsRouter");
const authRouter = require("./routes/auth");

const app = express();

app.set("json spaces", 2);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use('/api/users', authRouter);
app.use('/api/contacts', contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;


