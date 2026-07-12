const db = require("../config/db");

const admin = (req, res, next) => {
  const userId = req.user.id;

  const sql = "SELECT role FROM users WHERE id=?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
    if (result.length === 0) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }
    if (result[0].role != "ADMIN") {
      return res.status(403).json({
        message: "Access Denied. Admin Only.",
      });
    }
    next();
  });
};

module.exports = admin;
