const db = require("../config/db");
const cloudinary = require("../config/cloudinary");

const addProduct = (req, res) => {
  const { category_id, name, description, price, stock } = req.body;
  const image = req.file ? req.file.path : null;

  const checkCategoryQuery = "SELECT id from categories WHERE id=?";
  const insertProductQuery = `INSERT INTO products
    (category_id, name, description, price, stock, image) 
    VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(checkCategoryQuery, [category_id], (err, result) => {
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

    db.query(
      insertProductQuery,
      [category_id, name, description, price, stock, image],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }
        return res.status(201).json({
          message: "Product Added Successfully",
          productId: result.insertId,
        });
      },
    );
  });
};

const getProducts = (req, res) => {
  const sql = `SELECT
            p.id,
            p.name,
            p.description,
            p.price,
            p.stock,
            p.image,
            c.name AS category
        FROM products p
        JOIN categories c
        ON p.category_id = c.id
        `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
    return res.status(200).json({
      message: "Products fetched successfully",
      products: result,
    });
  });
};

const getProductById = (req, res) => {
  const { id } = req.params;

  const sql = `
        SELECT
            p.id,
            p.name,
            p.description,
            p.price,
            p.stock,
            p.image,
            c.name AS category
        FROM products p
        JOIN categories c
        ON p.category_id = c.id
        WHERE p.id = ?
    `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    return res.status(200).json({
      message: "Product fetched successfully",
      product: result[0],
    });
  });
};

const updateProduct = (req, res) => {
  const { id } = req.params;

  const { category_id, name, description, price, stock } = req.body;

  // Get complete product details (including image)
  const checkProductQuery = "SELECT * FROM products WHERE id = ?";

  db.query(checkProductQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    const oldImage = result[0].image;

    const image = req.file ? req.file.path : oldImage;

    if (req.file && oldImage) {
      const publicId = oldImage.split("/").pop().split(".")[0];

      cloudinary.uploader.destroy(`ecommerce-products/${publicId}`);
    }

    // Check category exists
    const checkCategoryQuery = "SELECT id FROM categories WHERE id = ?";

    db.query(checkCategoryQuery, [category_id], (err, result) => {
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

      const updateQuery = `
        UPDATE products
        SET
          category_id = ?,
          name = ?,
          description = ?,
          price = ?,
          stock = ?,
          image = ?
        WHERE id = ?
      `;

      db.query(
        updateQuery,
        [category_id, name, description, price, stock, image, id],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: err.message,
            });
          }

          return res.status(200).json({
            message: "Product Updated Successfully",
            productId: id,
          });
        },
      );
    });
  });
};

const deleteProduct = (req, res) => {
  const { id } = req.params;

  const checkProductQuery = "SELECT * FROM products WHERE id = ?";

  db.query(checkProductQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
    if (result.length === 0) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    const image = result[0].image;

    if (image) {
      const publicId = image.split("/").pop().split(".")[0];

      cloudinary.uploader.destroy(
        `ecommerce-products/${publicId}`,
        (error, result) => {
          if (error) {
            console.log("Cloudinary Delete Error:", error);
          } else {
            console.log("Cloudinary Delete Success:", result);
          }
        },
      );
    }

    const deleteQuery = "DELETE FROM products where id = ?";

    db.query(deleteQuery, [id], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      return res.status(200).json({
        message: "Product Deleted Successfully",
      });
    });
  });
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
