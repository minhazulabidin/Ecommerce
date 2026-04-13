import axios from "axios";
import React, { useEffect, useState } from "react";

export const AllBanner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/banner/allBanner`,
          {
            withCredentials: true,
          },
        );

        setBanners(res?.data.data || res.data || []);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchBanners();
  }, []);

  return (
    <div className="max-w-screen py-6 mx-auto">
      <div className="space-y-6">
        <div className="grid md:grid-cols-9 gap-6">
          {banners.map((banner) => (
            <div
              key={banner._id}
              className="relative group cursor-pointer w-full md:h-75 md:col-span-3"
            >
              <img
                className="w-full h-full rounded-lg object-cover object-top"
                src={banner.image}
                alt={`Banner ${banner._id}`}
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg flex items-end justify-center pb-4 inset-x-0 bottom-0 p-3 bg-linear-to-t from-black/70 to-transparent rounded-b-lg opacity-0 group-hover:opacity-100 transition duration-300">
                <h3 className="text-white text-sm text-center truncate">
                  {banner.url || "No URL"}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
