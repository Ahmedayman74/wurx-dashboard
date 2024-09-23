import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import SidebarNav from "../sidebar/SidebarNav";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Content = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Redirect to login or home page after logout
    navigate("/login");
  };
  return (
    <>
      <div className="flex">
        <SidebarNav />
        <div className="w-full bg-gray-100">
          <div className="flex flex-col">
            <div className="container p-10">
              <div className="flex justify-end pb-10">
                <Button onClick={handleLogout} className="bg-red-700 ">
                  Logout
                </Button>
              </div>
              <Outlet />
            </div>
            <div className=" text-center fixed bottom-0 left-1/2 py-3">
              all rights reserved to
              <a
                className="text-[#00A4FF] inline-block px-2"
                target="_blank"
                href="https://wurxeg.com/">
                wurx.com
              </a>
              version : 1.0
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
