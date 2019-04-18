const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv").config();
const cors = require("cors");
const flash = require("connect-flash");
const session = require("express-session");

var db = require("./database");

const ENV = process.env.NODE_ENV;

const app = express();
app.use(
  session({
    secret: process.env.EXPRESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  })
);
app.use(cors());
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", require("./api/users"));

var now = db.query("SELECT NOW()");
now
  .then(function(res) {
    console.log(`PostgreSQL connected: ${res.rows[0].now}.`);
  })
  .catch(function(err) {
    return console.log(err.error);
  });

module.exports = app;
