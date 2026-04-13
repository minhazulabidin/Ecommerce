import React from "react";
import { Link, Outlet } from "react-router";
import Header from "./Nav/Header";
import SideNavBar from "./Nav/SideNavBar";
import { PrivetRoute } from "./PrivetRoute";

export default function RootLayout() {
  return (
    <PrivetRoute>
      <div className="relative pt-17.5 h-screen">
        <Header />
        <div>
          <div className="flex items-start px-6 py-5">
            <SideNavBar />
            <Outlet />
          </div>
        </div>
      </div>
    </PrivetRoute>
  );
}
