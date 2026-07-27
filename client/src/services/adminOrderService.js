import API from "./api";

const getToken = () => localStorage.getItem("token");

export const getAllOrders = async () => {
  const response = await API.get("/orders/admin", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await API.put(
    `/orders/${id}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );

  return response.data;
};
