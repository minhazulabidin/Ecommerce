import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CategoryShowCase from './../Components/ui/CategoryShowCase';

export const AllCategory = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/category/categories`,
          {
            withCredentials: true,
          },
        );

        setCategories(res?.data.data || res.data || []);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchCategories();
  }, []);
  console.log(categories)

  return (
    <main className="w-9/12 mx-auto">
      <CategoryShowCase
        cards={categories.map((item) => ({
          title: item.name,
          description: item.slug,
          src: item.image,
          ctaText: "Visit",
          ctaLink: item.url,
          product: item.product,
          subCategory: item.subCategory,
          discount: item.discount,
          content: () => (
            <p>{item.url}</p>
          ),
        }))}
      />
    </main>
  )
}
