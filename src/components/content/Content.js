import React from "react";
import { Outlet } from "react-router-dom";
import SidebarNav from "../sidebar/SidebarNav";
import { Input } from "../ui/input";

const Content = () => {
  return (
    <div className="flex">
      <SidebarNav />
      <div className="w-full bg-gray-100">
        <div className="container p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Content;
