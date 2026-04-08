import React from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: RootLayout,
      children: [{ index: true, Component: Home }],
    },
  ]);

  return <RouterProvider router={router} />;
}
