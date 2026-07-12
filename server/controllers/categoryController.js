const db = require("../config/db");

const addCategory = (req, res) => {
  const { name, description } = req.body;

  const checkQuery = "SELECT * FROM categories where name=?";

  db.query(checkQuery, [name], (err, result) => {
    if (err) {
      return res.status(500).json({
        messsage: err.message,
      });
    }
    if (result.length > 0) {
      return res.status(400).json({
        messsage: "Category Already Exists",
      });
    }
    const InsertQuery = "Insert into categories(name,description) values(?,?)";

    db.query(InsertQuery, [name, description], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }
      res.status(201).json({
        message: "Category Added Successfully",
        categoryId: result.insertId,
      });
    });
  });
};

const getCategories = (req, res) => {
  const sql = "Select * from categories";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
    res.status(200).json(result);
  });
};

const getCategoryById = (req, res) => {
  const id = req.params.id;

  const sql = "Select * from categories where id = ?";

  db.query(sql, id, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
    if (result.length === 0) {
      return res.status(404).json({
        message: "Category Not Found",
      });
    }
    res.status(200).json(result[0]);
  });
};

const updateCategory = (req, res) => {
  const id = req.params.id;

  const { name, description } = req.body;

  const sql = "UPDATE categories SET name = ?, description = ? WHERE id = ?";

  db.query(sql, [name, description, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Category Not Found",
      });
    }
    res.status(200).json({
      message: "Category Updated Successfully",
    });
  });
};

const deleteCategory = (req, res) => {
  const id = req.params.id;

  const sql = "delete from categories where id = ?";

  db.query(sql, id, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Category Not Found",
      });
    }

    res.status(200).json({
      message: "Category Deleted Successfully",
    });
  });
};

module.exports = {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
