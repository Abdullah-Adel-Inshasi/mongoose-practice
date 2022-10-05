require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const todoRoute = require("./routes/todos");
const app = express();

// connecting to mongoDB database and applying listeners on connection state
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  auth: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error)).on("open", () =>
  console.log("Connected to database")
);

// app.use <-- middleware
// express.json() <-- parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json());

app.use("/todo", todoRoute);

// initializing the server
app.listen(process.env.port, () => {
  console.log(`connected to port ${process.env.port}`);
});
