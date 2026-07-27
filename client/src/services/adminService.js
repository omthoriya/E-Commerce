import API from "./api";

const getToken = () => localStorage.getItem("token");

export const getDashboard = async () => {
  const response = await API.get("/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const getRecentOrders = async () => {
  try {
    const response = await API.get("/admin/recent-orders", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await API.get(`/orders/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
