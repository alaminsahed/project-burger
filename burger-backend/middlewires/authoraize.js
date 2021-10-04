const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) res.status(401).send("Invalid token");

  try {
    const decode = jwt.verify(token.split(" ")[1].trim(), process.env.key);
 
    if (!decode) return res.status(403).send("Unauthorized user");

    req.user = decode;
    next();
  } catch (error) {
    res.status(403).send("Unauthorized user");
  }
};

module.exports = auth;
