import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import SidebarNav from "../sidebar/SidebarNav";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../rtk/slices/sidebar-slice";

const Content = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
              <div className="flex items-center gap-5  justify-end pb-10">
                <Menu
                  onClick={() => {
                    dispatch(toggleSidebar());
                  }}
                  className="cursor-pointer block lg:hidden"
                  size={40}
                />
                <Button
                  onClick={handleLogout}
                  className="bg-[#2e1065] hover:bg-[#00A4FF]">
                  Logout
                </Button>
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <div className=" text-center py-3 bg-white relative md:z-[1] lg:z-[102]">
        all rights reserved to
        <a
          className="text-[#00A4FF] inline-block px-2"
          target="_blank"
          href="https://wurxeg.com/">
          wurx.com
        </a>
        version : 1.0
      </div>
    </>
  );
};

export default Content;
