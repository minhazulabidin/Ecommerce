import axios from "axios";
import React, { useEffect } from "react";

export const AllBanner = () => {
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/banner/allBanner`)
  },[]);

  return (
    <div className="max-w-screen py-6 mx-auto">
      <div className="space-y-6">
        <div className="grid md:grid-cols-9 gap-6">
          <div className="relative group cursor-pointer w-full md:h-75 md:col-span-3">
            <img
              className="w-full h-full rounded-lg object-cover object-top"
              src="https://readymadeui.com/images/gallery-img-1.webp"
              alt="img-1"
            />
            <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
              <h3 className="text-white text-lg font-semibold">
                Your Title Here
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
