require("dotenv").config();
var jwt = require("jsonwebtoken");
var token = jwt.sign({ foo: "bar" }, "shhhhh");
const nonSercurePaths = ["/", "/register", "/login", "/logout"];
const createJWT = (payload) => {
  let key = "phucfixne";
  let token;
  try {
    token = jwt.sign(payload, key, { expiresIn: 300000 });
  } catch (e) {
    console.log(e);
  }

  return token;
};

const verifyToken = (token) => {
  let key = "phucfixne";
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (e) {
    console.log(e);
  }
  return decoded;
};

module.exports = {
  createJWT,
  verifyToken,
  checkUserJWT,
  checkUserPermission,
};
