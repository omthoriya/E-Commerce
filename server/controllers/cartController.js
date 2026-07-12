const db = require("../config/db");

const addToCart = (req, res) => {
  const userId = req.user.id;
  const { product_id, quantity } = req.body;

  if (!product_id) {
    return res.status(400).json({
      message: "Product ID is required",
    });
  }

  if (!quantity || quantity <= 0) {
    return res.status(400).json({
      message: "Quantity must be greater than 0",
    });
  }

  const checkProductQuery = "SELECT id from products where id=?";

  db.query(checkProductQuery, [product_id], (err, result) => {
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

    const checkCartQuery =
      "SELECT id FROM cart WHERE user_id = ? AND product_id = ?";

    db.query(checkCartQuery, [userId, product_id], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      if (result.length > 0) {
        const updateQuantity =
          "UPDATE cart set quantity = quantity + ? where user_id = ? AND product_id = ?";

        db.query(
          updateQuantity,
          [quantity, userId, product_id],
          (err, result) => {
            if (err) {
              return res.status(500).json({
                message: err.message,
              });
            }
            return res.status(200).json({
              message: "Cart Quantity Updated Successfully",
            });
          },
        );
      } else {
        const insertCartQuery =
          "INSERT INTO cart(user_id, product_id, quantity) VALUES (?, ?, ?)";

        db.query(
          insertCartQuery,
          [userId, product_id, quantity],
          (err, result) => {
            if (err) {
              return res.status(500).json({
                message: err.message,
              });
            }

            return res.status(201).json({
              message: "Product Added To Cart Successfully",
              cartId: result.insertId,
            });
          },
        );
      }
    });
  });
};

const getCart = (req, res) => {
  const userId = req.user.id;
  const sql = `
        SELECT
            c.id AS cartId,
            p.id AS productId,
            p.name,
            p.price,
            p.image,
            c.quantity
        FROM cart c
        JOIN products p
        ON c.product_id = p.id
        WHERE c.user_id = ?
        `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(200).json({
        message: "Your cart is empty",
        cart: [],
      });
    }

    return res.status(200).json({
      message: "Cart fetched successfully",
      cart: result,
    });
  });
};

const updateCart = (req, res) => {
  const { id } = req.params;

  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({
      message: "Quantity must be greater than 0",
    });
  }

  const checkCartQuery = "SELECT id FROM cart WHERE id = ?";

  db.query(checkCartQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Cart Item Not Found",
      });
    }

    const updateQuantity = "UPDATE cart SET quantity = ? WHERE id = ?";

    db.query(updateQuantity, [quantity, id], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      return res.status(200).json({
        message: "Cart Quantity Updated Successfully",
      });
    });
  });
};

const deleteCart = (req, res) => {
  const { id } = req.params;

  const checkCartQuery = "SELECT id FROM cart WHERE id = ?";
  db.query(checkCartQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Cart Item Not Found",
      });
    }

    const deleteCartQuery = "DELETE FROM cart WHERE id=?";

    return db.query(deleteCartQuery, [id], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }
      return res.status(200).json({
        message: "Cart Item Deleted Successfully",
      });
    });
  });
};

const clearCart = (req, res) => {

  const userId = req.user.id;

  const sql = "DELETE FROM cart WHERE user_id = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Cart is already empty",
      });
    }

    return res.status(200).json({
      message: "Cart Cleared Successfully",
    });
  });
};

module.exports = { addToCart, getCart, updateCart, deleteCart,clearCart };
