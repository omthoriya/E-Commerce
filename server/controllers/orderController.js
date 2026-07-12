const db = require("../config/db");

const placeOrder = (req, res) => {
  const userId = req.user.id;

  // Step 1: Check Cart
  const getCartQuery = "SELECT * FROM cart WHERE user_id = ?";

  db.query(getCartQuery, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(400).json({
        message: "Your cart is empty",
      });
    }

    // Step 2: Get Cart Items
    const getCartItemsQuery = `
      SELECT
        p.id AS product_id,
        p.name,
        p.price,
        c.quantity
      FROM cart c
      JOIN products p
      ON c.product_id = p.id
      WHERE c.user_id = ?
    `;

    db.query(getCartItemsQuery, [userId], (err, cartItems) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      // Step 3: Calculate Total Amount
      let totalAmount = 0;

      for (const item of cartItems) {
        totalAmount += item.price * item.quantity;
      }

      // Step 4: Create Order
      const insertOrderQuery =
        "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)";

      db.query(insertOrderQuery, [userId, totalAmount], (err, result) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }

        const orderId = result.insertId;

        // Step 5: Insert Order Items
        const insertOrderItemQuery = `
            INSERT INTO order_items
            (order_id, product_id, quantity, price)
            VALUES (?, ?, ?, ?)
          `;

        let completed = 0;

        for (const item of cartItems) {
          db.query(
            insertOrderItemQuery,
            [orderId, item.product_id, item.quantity, item.price],
            (err) => {
              if (err) {
                return res.status(500).json({
                  message: err.message,
                });
              }

              completed++;

              // After all items are inserted
              if (completed === cartItems.length) {
                const clearCartQuery = "DELETE FROM cart WHERE user_id = ?";

                db.query(clearCartQuery, [userId], (err) => {
                  if (err) {
                    return res.status(500).json({
                      message: err.message,
                    });
                  }

                  return res.status(201).json({
                    message: "Order Placed Successfully",
                    orderId: orderId,
                  });
                });
              }
            },
          );
        }
      });
    });
  });
};

const getOrder = (req, res) => {
  const userId = req.user.id;
  const sql = "SELECT * FROM orders WHERE user_id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
    if (result.length === 0) {
      return res.status(404).json({
        message: "No Orders Found",
      });
    }
    return res.status(200).json({
      message: "Orders fetched successfully",
      orders: result,
    });
  });
};

const getOrderById = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const checkOrderQuery = `
    SELECT * FROM orders
    WHERE id = ?
    AND user_id = ?;
    `;

  db.query(checkOrderQuery, [id, userId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
    if (result.length === 0) {
      return res.status(404).json({
        message: "Orders Not Found",
      });
    }
    const getOrderItemsQuery = `
      SELECT
      oi.product_id,
      p.name,
      oi.quantity,
      oi.price
      FROM order_items oi
      JOIN products p
      ON oi.product_id = p.id
      WHERE oi.order_id = ?
      `;

    db.query(getOrderItemsQuery, [id], (err, items) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }
      return res.status(200).json({
        message: "Order fetched successfully",
        order: result[0],
        items: items,
      });
    });
  });
};

  const updateOrderStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatus = [
      "PENDING",
      "CONFIRMED",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
    ];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid Order Status",
      });
    }

    const checkOrderQuery = "SELECT * FROM orders where id = ?";

    db.query(checkOrderQuery, [id], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }
      if (result.length === 0) {
        return res.status(404).json({
          message: "Order Not Found",
        });
      }

      const updateOrderQuery = "UPDATE orders SET status = ? WHERE id = ?";

      db.query(updateOrderQuery, [status, id], (err, result) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }
        return res.status(200).json({
          message: "Order Updated Successfully",
        });
      });
    });
  };

  const cancelOrder = (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    const checkOrderQuery = "SELECT * FROM orders WHERE id = ? AND user_id = ?";

    db.query(checkOrderQuery,[id,userId],(err,result)=>{
      if(err){
        return res.status(500).json({
          message:err.message
        })
      }
      if(result.length === 0){
        return res.status(404).json({
          message:"Order Not Found"
        })
      }
      if (result[0].status !== "PENDING") {
        return res.status(400).json({
          message: "Only pending orders can be cancelled",
        });
      }
        const cancelOrderQuery =
          "UPDATE orders SET status = 'CANCELLED' WHERE id = ?";

        db.query(cancelOrderQuery, [id], (err) => {
          if (err) {
            return res.status(500).json({
              message: err.message,
            });
          }

          return res.status(200).json({
            message: "Order Cancelled Successfully",
          });
        });
    })
  };

module.exports = { placeOrder, getOrder, getOrderById, updateOrderStatus,cancelOrder };
