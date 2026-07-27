const db = require("../config/db");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const checkEmailQuery = "SELECT * FROM users WHERE email = ?";

    db.query(checkEmailQuery, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "User Already Exists.",
        });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const insertQuery =
        "INSERT INTO users(name,email,password) VALUES(?,?,?)";

      db.query(insertQuery, [name, email, hashPassword], (err, result) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }

        return res.status(201).json({
          message: "User Registered Successfully",
          userId: result.insertId,
        });
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql = "Select * from users where email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
    if (result.length === 0) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }
    const user = result[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    res.status(200).json({
      message: "Login Successfull",
      token: generateToken(user.id),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });
};

const getProfile = (req, res) => {
  res.json({
    message: "Protected Route Accessed",
    user: req.user,
  });
};

const getUsers = (req, res) => {
  const sql = `
    SELECT
      id,
      name,
      email,
      role,
      created_at
    FROM users
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    return res.status(200).json({
      message: "Users fetched successfully",
      users: result,
    });
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  // Prevent deleting yourself (optional but recommended)
  if (req.user.id == id) {
    return res.status(400).json({
      message: "You cannot delete your own account",
    });
  }

  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      message: "User Deleted Successfully",
    });
  });
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  getUsers,
  deleteUser,
};
