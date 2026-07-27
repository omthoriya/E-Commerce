const db = require("../config/db");

const getDashboard = (req, res) => {
  const totalUserQuery = "SELECT COUNT(*) AS TotalUsers FROM users";

  db.query(totalUserQuery, (err, userResult) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    const totalCategoriesQuery =
      "SELECT COUNT(*) AS TotalCategories FROM categories";

    db.query(totalCategoriesQuery, (err, categoryResult) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      const totalProductsQuery =
        "SELECT COUNT(*) AS TotalProducts FROM products";

      db.query(totalProductsQuery, (err, productResult) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }

        const totalOrdersQuery = "SELECT COUNT(*) AS TotalOrders FROM orders";

        db.query(totalOrdersQuery, (err, orderResult) => {
          if (err) {
            return res.status(500).json({
              message: err.message,
            });
          }

          const totalRevenueQuery = `
            SELECT IFNULL(SUM(total_amount), 0) AS TotalRevenue
            FROM orders
            WHERE status != 'CANCELLED'
          `;

          db.query(totalRevenueQuery, (err, revenueResult) => {
            if (err) {
              return res.status(500).json({
                message: err.message,
              });
            }

            return res.status(200).json({
              totalUsers: userResult[0].TotalUsers,
              totalCategories: categoryResult[0].TotalCategories,
              totalProducts: productResult[0].TotalProducts,
              totalOrders: orderResult[0].TotalOrders,
              totalRevenue: revenueResult[0].TotalRevenue,
            });
          });
        });
      });
    });
  });
};

const getRecentOrders = (req, res) => {
  const sql = `
    SELECT
      o.id,
      u.name,
      u.email,
      o.total_amount,
      o.status,
      o.created_at
    FROM orders o
    JOIN users u
      ON o.user_id = u.id
    ORDER BY o.created_at DESC
    LIMIT 5
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    return res.status(200).json({
      recentOrders: result,
    });
  });
};

module.exports = {
  getDashboard,
  getRecentOrders,
};
