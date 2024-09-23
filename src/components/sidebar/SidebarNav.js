import Logo from "./Logo";
import MenuList from "./MenuList";
import logoimg from "../../imgs/logo-wuccccrx-cart.png";
import { Button } from "../ui/button";

const SidebarNav = () => {
  return (
    <div className="w-[100px] lg:w-[300px] h-screen ">
      <div className="p-2 lg:p-5 flex items-center">
        <Logo img={logoimg} />
      </div>
      <div className="border-b border-gray-200"></div>
      <MenuList />
    </div>
  );
};

export default SidebarNav;
