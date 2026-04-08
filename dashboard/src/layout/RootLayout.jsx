import React from "react";
import { Link, Outlet } from "react-router";
import Header from "./Nav/Header";
import SideNavBar from "./Nav/SideNavBar";

export default function RootLayout() {
  return (
    <div>
      <div className="relative pt-17.5 h-screen">
        <Header />
        <div>
          <div className="flex items-start">
            <SideNavBar />
            <button
              id="toggle-sidebar"
              className="lg:hidden w-8 h-8 z-100 fixed top-18.5 left-2.5 cursor-pointer bg-[#007bff] flex items-center justify-center rounded-full outline-0 transition-all duration-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
                className="w-3 h-3"
                viewBox="0 0 55.752 55.752"
              >
                <path
                  d="M43.006 23.916a5.36 5.36 0 0 0-.912-.727L20.485 1.581a5.4 5.4 0 0 0-7.637 7.638l18.611 18.609-18.705 18.707a5.398 5.398 0 1 0 7.634 7.635l21.706-21.703a5.35 5.35 0 0 0 .912-.727 5.373 5.373 0 0 0 1.574-3.912 5.363 5.363 0 0 0-1.574-3.912z"
                  data-original="#000000"
                />
              </svg>
            </button>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
