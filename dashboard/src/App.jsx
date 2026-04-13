import React from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import AllProducts from "./pages/AllProducts";
import Login from "./pages/Login";
import { AddCategory } from "./pages/AddCategory";
import { AllCategory } from "./pages/AllCategory";
import { AddBanner } from "./pages/AddBanner";
import { AllBanner } from "./pages/AllBanner";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: RootLayout,
      children: [
        { index: true, Component: Home },
        { path: "/add-product", Component: AddProduct },
        { path: "/all-products", Component: AllProducts },
        { path: "/add-category", Component: AddCategory },
        { path: "/all-category", Component: AllCategory },
        { path: "/add-banner", Component: AddBanner },
        { path: "/all-banner", Component: AllBanner },
      ],
    },
    {
      path: "/login",
      Component: Login,
    },
  ]);

  return <RouterProvider router={router} />;
}
