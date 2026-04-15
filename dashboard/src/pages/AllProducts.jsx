import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductsShowcase from "./../Components/ui/ProductsShowcase";
import Swal from "sweetalert2";

export const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (product) => {
    setEditId(product._id);
    setEditData({
      name: product.name,
      description: product.description,
      category: product.category?._id || "",
      price: product.price,
      variantType: product.variantType,
    });
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/products/update/${id}`,
        editData,
        { withCredentials: true },
      );

      // UI update
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, ...editData } : p)),
      );

      setEditId(null);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed)
          await axios
            .delete(
              `${import.meta.env.VITE_API_URL}/products/deleteProduct/${id}`,
              { withCredentials: true },
            )
            .then(() => {
              setProducts((prev) => prev.filter((p) => p._id !== id));
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            });
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/allProducts`,
          {
            withCredentials: true,
          },
        );

        setProducts(res?.data.data || res.data || []);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50 whitespace-nowrap">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
              <div className="flex items-center">Product Name</div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
              <div className="flex items-center">Description</div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
              <div className="flex items-center">Category</div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
              <div className="flex items-center">Price</div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
              <div className="flex items-center">Variant</div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 fill-gray-500 inline mr-2"
                  viewBox="0 0 24 24"
                >
                  <g transform="matrix(1.05 0 0 1.05 -.6 -.6)">
                    <path
                      d="M19 22.75H5c-2.07 0-3.75-1.68-3.75-3.75V7c0-2.07 1.68-3.75 3.75-3.75h14c2.07 0 3.75 1.68 3.75 3.75v12c0 2.07-1.68 3.75-3.75 3.75zm-14-18C3.76 4.75 2.75 5.76 2.75 7v12c0 1.24 1.01 2.25 2.25 2.25h14c1.24 0 2.25-1.01 2.25-2.25V7c0-1.24-1.01-2.25-2.25-2.25z"
                      data-original="#000000"
                    />
                    <path
                      d="M22 9.75H2c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h20c.41 0 .75.34.75.75s-.34.75-.75.75zm-5-5c-.41 0-.75-.34-.75-.75V2c0-.41.34-.75.75-.75s.75.34.75.75v2c0 .41-.34.75-.75.75zm-10 0c-.41 0-.75-.34-.75-.75V2c0-.41.34-.75.75-.75s.75.34.75.75v2c0 .41-.34.75-.75.75z"
                      data-original="#000000"
                    />
                    <circle cx={7} cy={13} r={1} data-original="#000000" />
                    <circle cx={12} cy={13} r={1} data-original="#000000" />
                    <circle cx={17} cy={13} r={1} data-original="#000000" />
                    <circle cx={7} cy={18} r={1} data-original="#000000" />
                    <circle cx={12} cy={18} r={1} data-original="#000000" />
                    <circle cx={17} cy={18} r={1} data-original="#000000" />
                  </g>
                </svg>
                Create Date
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 fill-gray-500 inline mr-2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 23.5C5.675 23.5.5 18.325.5 12S5.675.5 12 .5c.69 0 1.15.46 1.15 1.15S12.69 2.8 12 2.8c-5.06 0-9.2 4.14-9.2 9.2s4.14 9.2 9.2 9.2 9.2-4.14 9.2-9.2c0-.69.46-1.15 1.15-1.15s1.15.46 1.15 1.15c0 6.325-5.175 11.5-11.5 11.5z"
                    data-original="#000000"
                  />
                  <path
                    d="M12 18.325c-3.45 0-6.325-2.875-6.325-6.325S8.55 5.675 12 5.675c.69 0 1.15.46 1.15 1.15s-.46 1.15-1.15 1.15c-2.185 0-4.025 1.84-4.025 4.025s1.84 4.025 4.025 4.025 4.025-1.84 4.025-4.025c0-.69.46-1.15 1.15-1.15s1.15.46 1.15 1.15c0 3.45-2.875 6.325-6.325 6.325z"
                    data-original="#000000"
                  />
                  <path
                    d="M12 13.15c-.345 0-.575-.115-.805-.345-.46-.46-.46-1.15 0-1.61l3.68-3.68c.46-.46 1.15-.46 1.61 0s.46 1.15 0 1.61l-3.565 3.68c-.345.23-.575.345-.92.345z"
                    data-original="#000000"
                  />
                  <path
                    d="M19.245 9.585h-3.68c-.69 0-1.15-.46-1.15-1.15v-3.68c0-.345.115-.575.345-.805L17.865.845c.345-.345.805-.46 1.265-.23s.69.575.69 1.035v2.415h2.53c.46 0 .92.23 1.035.69.23.46.115.92-.23 1.265L20.05 9.24c-.23.115-.46.345-.805.345zm-2.53-2.3h1.955l.805-.805h-.805c-.69 0-1.15-.46-1.15-1.15v-.92l-.805.805z"
                    data-original="#000000"
                  />
                </svg>
                Action
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="whitespace-nowrap divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product._id}>
              <td className="px-4 py-3 text-sm">
                {editId === product._id ? (
                  <input
                    name="name"
                    value={editData.name}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  <div className="flex items-center w-max">
                    <img
                      src={product.image[0].url}
                      className="w-9 h-9 rounded-full"
                    />
                    <p className="ml-2">{product.name}</p>
                  </div>
                )}
              </td>
              <td className="px-4 py-3 text-sm">
                {editId === product._id ? (
                  <input
                    name="description"
                    value={editData.description}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  product.description.substring(0, 30)
                )}
              </td>
              <td className="px-4 py-3 text-sm">
                {editId === product._id ? (
                  <input
                    name="category"
                    value={editData.category}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  product?.category?.name
                )}
              </td>
              <td className="px-4 py-3 text-sm">
                {editId === product._id ? (
                  <input
                    name="price"
                    value={editData.price}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  `${product.price} Taka`
                )}
              </td>
              <td className="px-4 py-3 text-sm">
                {editId === product._id ? (
                  <select
                    name="variantType"
                    value={editData.variantType}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded w-full"
                  >
                    <option value="singleVariant">Single Variant</option>
                    <option value="multiVariant">Multi Variant</option>
                  </select>
                ) : (
                  product.variantType
                )}
              </td>
              <td className="px-4 py-3 text-sm text-slate-600 font-medium">
                {new Date(product.createdAt).toLocaleString("en-BD", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </td>
              <td className="flex gap-3 px-4 py-3 text-sm">
                {editId === product._id ? (
                  <>
                    <button
                      onClick={() => handleUpdate(product._id)}
                      className="text-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="text-gray-500"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(product)}>Edit</button>
                    <button onClick={() => handleDelete(product._id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="md:flex m-4">
        <p className="text-sm text-slate-600 flex-1">
          Showind 1 to 10 of 100 entries
        </p>
        <div className="flex items-center max-md:mt-4">
          <p className="text-sm text-slate-600">Display</p>
          <select className="text-sm text-slate-900 border border-gray-300 rounded-md h-9 mx-4 px-1 outline-none">
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>
          <ul className="flex space-x-3 justify-center">
            <li className="flex items-center justify-center shrink-0 bg-gray-100 w-9 h-9 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 fill-gray-400"
                viewBox="0 0 55.753 55.753"
              >
                <path
                  d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                  data-original="#000000"
                />
              </svg>
            </li>
            <li className="flex items-center justify-center shrink-0 bg-blue-500  border hover:border-blue-500 border-blue-500 cursor-pointer text-sm font-medium text-white px-[13px] h-9 rounded-md">
              1
            </li>
            <li className="flex items-center justify-center shrink-0 border border-gray-300 hover:border-blue-500 cursor-pointer text-sm font-medium text-slate-900 px-[13px] h-9 rounded-md">
              2
            </li>
            <li className="flex items-center justify-center shrink-0 border border-gray-300 hover:border-blue-500 cursor-pointer text-sm font-medium text-slate-900 px-[13px] h-9 rounded-md">
              3
            </li>
            <li className="flex items-center justify-center shrink-0 border border-gray-300 hover:border-blue-500 cursor-pointer text-sm font-medium text-slate-900 px-[13px] h-9 rounded-md">
              4
            </li>
            <li className="flex items-center justify-center shrink-0 border border-gray-300 hover:border-blue-500 cursor-pointer w-9 h-9 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 fill-gray-400 rotate-180"
                viewBox="0 0 55.753 55.753"
              >
                <path
                  d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                  data-original="#000000"
                />
              </svg>
            </li>
          </ul>
        </div>
      </div> */}
    </div>
  );
};
