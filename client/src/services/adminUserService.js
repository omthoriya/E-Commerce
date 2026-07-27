import API from "./api";

const getToken = () => localStorage.getItem("token");

export const getUsers = async () => {
  const response = await API.get("/users", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const deleteUser = async (id) => {
  const response = await API.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};