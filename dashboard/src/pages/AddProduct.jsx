import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';

export default function AddProduct() {

  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "",
    discountPrice: "",
    description: "",
    category: "",
    variantType: "singleVariant",
  });
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/category/categories`
        );
        setCategories(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
    if (e.target.files.length > 0) {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      for (let i = 0; i < images.length; i++) {
        formData.append("image", images[i]);
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/products/addProduct`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Product Added",
        text: res.data.message,
      });

    } catch (err) {
      console.error(err.response?.data || err.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || err.message,
      });
    } finally {
      setLoading(false);
      setForm({
        name: "",
        sku: "",
        price: "",
        discountPrice: "",
        description: "",
        category: "",
        variantType: "singleVariant",
      });
      setImages([]);
      setPreview(null);
    }
  };

  return (
    <div className=" mx-auto p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        {/* SKU */}
        <input
          type="text"
          name="sku"
          placeholder="SKU"
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        {/* Discount Price */}
        <input
          type="number"
          name="discountPrice"
          placeholder="Discount Price"
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        {/* Category (Dynamic) */}
        <select
          name="category"
          onChange={handleChange}
          className="w-full p-3 border rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Variant Type */}
        <select
          name="variantType"
          onChange={handleChange}
          className="w-full p-3 border rounded"
        >
          <option value="singleVariant">Single Variant</option>
          <option value="multipleVariant">Multiple Variant</option>
        </select>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        {/* Images */}
        <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition cursor-pointer">
          <input
            type="file"
            accept="image/*"
            multiple
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
                  setImages(null);
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

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}