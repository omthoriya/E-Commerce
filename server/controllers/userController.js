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
    });
    const hashPassword = await bcrypt.hash(password, 10);

    const InsertQuery = "Insert into users(name,email,password) values(?,?,?)";

    db.query(InsertQuery, [name, email, hashPassword], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }
      res.status(201).json({
        message: "User Registered Successfully",
        userId: result.insertId,
      });
    });
  } catch (error) {
    res.status(500).json({
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

    if(!match){
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    res.status(201).json({
      message:"Login Successfull",
      token:generateToken(user.id)
    })

  });
};

const getProfile = (req,res)=>{
  res.json({
    message: "Protected Route Accessed",
    user:req.user
  });
}

module.exports = {
  registerUser,
  loginUser,
  getProfile
};
