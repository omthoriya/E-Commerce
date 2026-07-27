import API from "./api";

const getToken = () => {
  return localStorage.getItem("token");
};

// Get Cart
export const getCart = async () => {
  const response = await API.get("/cart", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Add To Cart
export const addToCart = async (product_id, quantity = 1) => {
  const response = await API.post(
    "/cart",
    {
      product_id,
      quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );

  return response.data;
};

// Update Cart Quantity
export const updateCart = async (cartId, quantity) => {
  const response = await API.put(
    `/cart/${cartId}`,
    {
      quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );

  return response.data;
};

// Delete Cart Item
export const deleteCart = async (cartId) => {
  const response = await API.delete(`/cart/${cartId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Clear Cart
export const clearCart = async () => {
  const response = await API.delete("/cart", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};
