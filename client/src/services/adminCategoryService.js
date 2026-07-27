import API from "./api";

const getToken = () => localStorage.getItem("token");

export const getCategories = async () => {
  const response = await API.get("/categories", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const addCategory = async (categoryData) => {
  const response = await API.post("/categories", categoryData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const updateCategory = async (id, categoryData) => {
  const response = await API.put(`/categories/${id}`, categoryData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await API.delete(`/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};
