import { useEffect, useState } from "react";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../services/adminCategoryService";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch categories");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let data;

      if (isEdit) {
        data = await updateCategory(editingId, formData);
      } else {
        data = await addCategory(formData);
      }

      alert(data.message);

      fetchCategories();

      setFormData({
        name: "",
        description: "",
      });

      setEditingId(null);
      setIsEdit(false);
      setShowModal(false);
    } catch (error) {
      alert(error.response?.data?.message || "Failed");
    }
  };

  const handleEdit = (category) => {
    setIsEdit(true);
    setEditingId(category.id);

    setFormData({
      name: category.name,
      description: category.description,
    });

    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?",
    );
    if(!confirmDelete) return;

    try{
        const data = await deleteCategory(id);

        alert(data.message);
        fetchCategories();
    } catch(error){
        alert(error.reaponse?.data?.message || "Delete Failed");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>

        <button
          onClick={() => {
            setIsEdit(false);
            setEditingId(null);

            setFormData({
              name: "",
              description: "",
            });

            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Category
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Description</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category.id} className="border-t">
                  <td className="px-6 py-4">{category.id}</td>

                  <td className="px-6 py-4">{category.name}</td>

                  <td className="px-6 py-4">{category.description}</td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleEdit(category)}
                      className="bg-yellow-500 text-white px-4 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button onClick={()=>handleDelete(category.id)} className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6">
                  No Categories Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white w-[450px] rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-5">
              {isEdit ? "Edit Category" : "Add Category"}
            </h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Category Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-3 rounded mb-4"
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border p-3 rounded mb-4"
                rows="4"
                required
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);

                    setFormData({
                      name: "",
                      description: "",
                    });

                    setIsEdit(false);
                    setEditingId(null);
                  }}
                  className="px-5 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded"
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
};

export default Categories;
