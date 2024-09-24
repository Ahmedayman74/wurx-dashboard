import Logo from "./Logo";
import MenuList from "./MenuList";
import logoimg from "../../imgs/logo-wuccccrx-cart.png";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { toggleSidebar } from "../../rtk/slices/sidebar-slice";

const SidebarNav = () => {
  const sidebartoggle = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={` absolute top-0 z-[100] ${
          sidebartoggle ? `left-0` : `left-[-300px]`
        } lg:static duration-500 w-[300px] h-screen bg-white shadow-lg`}>
        <div className="p-2 lg:p-5 flex items-center justify-between">
          <Logo img={logoimg} />
          <X
            className="block lg:hidden cursor-pointer"
            size={40}
            onClick={() => dispatch(toggleSidebar())}
          />
        </div>
        <div className="border-b border-gray-200"></div>
        <MenuList />
      </div>

      {sidebartoggle && (
        <div className="bg-black absolute z-[10] opacity-[0.6] h-full w-full top-0 left-0"></div>
      )}
    </>
  );
};

export default SidebarNav;
