import { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../services/adminProductService";
import { getCategories } from "../../services/adminCategoryService";

const emptyForm = {
  category_id: "",
  name: "",
  description: "",
  price: "",
  stock: "",
  image: null,
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.products);
    } catch (e) {
      alert(e.response?.data?.message || "Failed to fetch products");
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (e) {
      alert(e.response?.data?.message || "Failed to fetch categories");
    }
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (isEdit) {
        res = await updateProduct(editingId, formData);
      } else {
        res = await addProduct(formData);
      }
      alert(res.message);
      setShowModal(false);
      setFormData(emptyForm);
      setIsEdit(false);
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (product) => {
    const cat = categories.find((c) => c.name === product.category);
    setIsEdit(true);
    setEditingId(product.id);
    setFormData({
      category_id: cat ? cat.id : product.category_id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: product.image,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await deleteProduct(id);
      alert(res.message);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded"
          onClick={() => {
            setFormData(emptyForm);
            setIsEdit(false);
            setEditingId(null);
            setShowModal(true);
          }}
        >
          + Add Product
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length ? (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>₹{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 mr-2 rounded"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No Products Found</td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-[500px]">
            <h2 className="text-2xl font-bold mb-4">
              {isEdit ? "Edit Product" : "Add Product"}
            </h2>
            <form onSubmit={handleSubmit}>
              <select
                className="w-full border p-2 mb-3"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input
                className="w-full border p-2 mb-3"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
              />
              <textarea
                className="w-full border p-2 mb-3"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              <input
                className="w-full border p-2 mb-3"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
              />
              <input
                className="w-full border p-2 mb-3"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Stock"
              />
              <input
                className="w-full border p-2 mb-3"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    setShowModal(false);
                    setFormData(emptyForm);
                    setIsEdit(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {isEdit ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
