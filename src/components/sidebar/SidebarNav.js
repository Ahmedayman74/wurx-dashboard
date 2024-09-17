import Logo from "./Logo";
import MenuList from "./MenuList";
import logoimg from "../../imgs/logo (1).png";

const SidebarNav = () => {
  return (
    <div className="w-[100px] lg:w-[300px] h-screen ">
      <div className="px-5 py-3">
        <Logo img={logoimg} />
      </div>
      <div className="px-5 py-3 border-b border-gray-200"></div>
      <MenuList />
    </div>
  );
};

export default SidebarNav;
