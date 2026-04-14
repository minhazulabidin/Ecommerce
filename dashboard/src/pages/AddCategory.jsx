import axios from "axios";
import Swal from "sweetalert2";
import React, { useState } from "react";

export const AddCategory = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("discount", discount);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/category/add-category`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        Swal.fire({
          title: "Category added successfully",
          icon: "success",
          draggable: true
        });
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Add New Category
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Image
          </label>

          <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />

            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-60 object-cover rounded-lg"
                />

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreview(null);
                    setImage(null);
                  }}
                  className="absolute top-2 right-2 bg-black/60 text-white text-xs px-3 py-1 rounded-lg hover:bg-black z-10"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40">
                <p className="text-gray-500">Click or drag image to upload</p>
              </div>
            )}
          </div>
        </div>

        {/* Redirect URL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount Percentage
            </label>
            <input
              type="number"
              placeholder="Enter discount percentage"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-4 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition"
        >
          {loading ? "Uploading..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};
