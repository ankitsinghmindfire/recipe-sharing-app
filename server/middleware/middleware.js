const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  console.log("token===>", token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    console.log("process.env.SECRET", process.env.SECRET);

    const decoded = jwt.verify(token, process.env.SECRET);
    console.log("decoded", decoded);
    console.log("Expiration Time:", decoded.exp);
    req.token = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token." });
  }
}

module.exports = verifyToken;
