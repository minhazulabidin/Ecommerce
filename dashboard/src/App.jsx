import React from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import AllProducts from "./pages/AllProducts";
import Login from "./pages/Login";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: RootLayout,
      children: [
        { index: true, Component: Home },
        { path: "/add-product", Component: AddProduct },
        { path: "/all-products", Component: AllProducts },
      ],
    },
    {
      path: "/login",
      Component: Login,
    },
  ]);

  return <RouterProvider router={router} />;
}
