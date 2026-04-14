import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductsShowcase from './../Components/ui/ProductsShowcase';

export const AllBanner = () => {
  const [banners, setBanners] = useState([]);
  console.log(banners)
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
        <div className="grid">
          <ProductsShowcase
            cards={banners.map((item) => ({
              title: item._id,
              description: "Click to show",
              src: item.image,
              ctaText: "Visit",
              ctaLink: item.url,
              content: () => (
                <p>{item.url}</p>
              ),
            }))}
          />
        </div>
      </div>
    </div>
  );
};
