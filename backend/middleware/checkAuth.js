const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.body.USER_uid = decoded.uid;
    req.body.USER_email = decoded.email;
    req.body.USER_name = decoded.name;
    req.body.USER_role = decoded.role;
    req.body.USER_department = decoded.department;

    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ error: "Authentication failed: Invalid token" });
  }
};


module.exports = checkAuth;
