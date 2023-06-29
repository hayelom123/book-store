const express = require("express");
const router = express.Router();

module.exports = router;
const bookRoute = require("./book.route");
const defaultRoutes = [
  {
    path: "/book",
    route: bookRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
