const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const questionRouter = require("./routes/questionroutes");
const cors = require("cors");
const apiRouter = require("./routes/apiroutes");

mongoose.connect(process.env.connection_string).then(() => {
  console.log('database is connected');
}).catch((e) => {
  console.log("We got an error", e);
})

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cors issue
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", ["http://localhost:3001"]);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

app.use(
  cors({
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  })
);

// routes
app.use("/questions", questionRouter);
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Codesave is live on http://localhost:${port}`);
});
