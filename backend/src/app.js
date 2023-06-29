const express = require("express");
const xss = require("xss-clean");
const path = require("path");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");

const cors = require("cors");
const helmet = require("helmet");
const httpStatus = require("http-status");
const config = require("./config/config");

const { errorConverter, errorHandler } = require("./middlewares/error");
const routes = require("./routes");

const app = express();

/////////////////////////////////////////////////////////////////////////////////////
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());
app.use((req, res, next) => {
  console.log(req["headers"]["user-agent"]);
  if (config.env === "development") {
    console.log(req.url);
    console.log(req.method);
  }

  next();
});

app.use("/api", routes);

function userIsAllowed(callback) {
  // this function would contain your logic, presumably asynchronous,
  // about whether or not the user is allowed to see files in the
  // protected directory; here, we'll use a default value of "false"
  callback(true);
}

// This function returns a middleware function
var protectPath = function (regex) {
  return function (req, res, next) {
    if (!regex.test(req.url)) {
      return next();
    }

    userIsAllowed(function (allowed) {
      if (allowed) {
        next(); // send the request to the next handler, which is express.static
      } else {
        res.end("You are not allowed!");
      }
    });
  };
};
app.use(protectPath(/^\/privateimages\/.*$/));
app.use(express.static(path.join(__dirname, "public")));

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);
// to generate secret key for jwt node > require("crypto").randomBytes(64).toString("hex");

module.exports = app;
