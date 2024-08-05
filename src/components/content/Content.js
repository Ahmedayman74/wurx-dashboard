import React from "react";
import { Outlet } from "react-router-dom";
import SidebarNav from "../sidebar/SidebarNav";

const Content = () => {
  return (
    <div className="flex">
      <SidebarNav />
      <div className="w-full bg-gray-100">
        <div className="w-[90%] container px-10 py-10  mx-6 my-10 bg-white rounded-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Content;
