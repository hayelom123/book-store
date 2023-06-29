const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { roleRights } = require("../config/roles");
const config = require("../config/config");
const { getUserById } = require("../services/user.services");

const jwt = require("jsonwebtoken");
function isObject(o) {
  // return o instanceof Object && o.constructor === Object;
  return o === null ||
    Array.isArray(o) ||
    typeof o == "function" ||
    o?.constructor === Date
    ? false
    : typeof o == "object";
}
const setNestedKey = (obj, path, value) => {
  if (path.length === 1) {
    obj[path] = value;
    return;
  }
  // console.log("isObejct", path[0], ":data:", isObject(obj[path[0]]));
  if (!isObject(obj[path[0]])) obj[path[0]] = {};
  return setNestedKey(obj[path[0]], path.slice(1), value);
};
const auth =
  (right = [], path = []) =>
  async (req, res, next) => {
    const receivedToken = req?.cookies?.token?.access?.token ?? "";
    console.log(receivedToken);
    if (receivedToken) {
      jwt.verify(
        receivedToken,
        config.jwt.secret,
        async function (err, decode) {
          if (err) {
            if (err.name === "TokenExpiredError") {
              const expUser = await jwt.verify(
                receivedToken,
                config.jwt.secret,
                {
                  ignoreExpiration: true,
                }
              );
              // console.log("Expired user:", expUser);
              return next(
                new ApiError(httpStatus.UNAUTHORIZED, "your session expired")
              );
            }
            console.log("error ocured during decode:", err);
            next(
              new ApiError(
                httpStatus.UNAUTHORIZED,
                "unauthorized access , please try to login again"
              )
            );
          } else {
            req.user = await getUserById(decode["sub"]);

            const value = req.user["_id"].toString();

            if (path.length != 0) {
              setNestedKey(req, path, value);
            }

            if (right.length != 0 && right && !right.includes(req.user["role"]))
              next(new ApiError(httpStatus.UNAUTHORIZED, "Forbidden"));
            next();
          }
        }
      );
    } else {
      next(new ApiError(httpStatus.UNAUTHORIZED, "please login"));
    }
    // req.headers.authorization?.split(" ")[1];
  };

module.exports = auth;
module.exports = auth;
