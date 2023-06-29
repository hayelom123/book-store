const config = require("../config/config");

var whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:8500",
];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  console.log(req.headers.origin);
  console.log("Origin:", req.header("Origin"));

  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  if (config.env === "development") {
    console.log("============================================================");
    corsOptions = { origin: true, credentials: true };
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
module.exports = {
  corsConfig: {
    origin: whitelist,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
  corsOptionsDelegate,
};
