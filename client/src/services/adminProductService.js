import API from "./api";

const getToken = () => localStorage.getItem("token");

export const getProducts = async () => {
  const response = await API.get("/products");
  return response.data;
};

// export const addProduct = async (productData) => {
//   const response = await API.post("/products", productData, {
//     headers: {
//       Authorization: `Bearer ${getToken()}`,
//     },
//   });

//   return response.data;
// };
export const addProduct = async (productData) => {
  const formData = new FormData();

  formData.append("category_id", productData.category_id);
  formData.append("name", productData.name);
  formData.append("description", productData.description);
  formData.append("price", productData.price);
  formData.append("stock", productData.stock);
  formData.append("image", productData.image);

  const response = await API.post("/products", formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const updateProduct = async (id, productData) => {
  const formData = new FormData();

  formData.append("category_id", productData.category_id);
  formData.append("name", productData.name);
  formData.append("description", productData.description);
  formData.append("price", productData.price);
  formData.append("stock", productData.stock);

  if (productData.image) {
    formData.append("image", productData.image);
  }

  const response = await API.put(`/products/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await API.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};
