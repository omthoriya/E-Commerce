// import { authPlugins } from "mysql2";
import { AxiosHeaders } from "axios";
import API from "./api";

const gettoken = () => localStorage.getItem("token");

export const placeOrder = async () => {
  const response = await API.post(
    "/orders",
    {},
    {
      headers: {
        Authorization: `Bearer ${gettoken()}`,
      },
    },
  );
  return response.data;
};

export const getOrders = async () => {
  const response = await API.get("/orders", {
    headers: {
      Authorization: `Bearer ${gettoken()}`,
    },
  });
  return response.data;
};
