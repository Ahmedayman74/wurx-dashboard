import MenuList from "./MenuList"
import Searchbar from "./Searchbar"
import SidebarHead from "./SidebarHead"




const SidebarNav = () => {
  return (
    <div className="w-[100px] lg:w-[300px] h-screen ">
      <SidebarHead/>
      <div className="px-5 py-3 border-b border-gray-200">
      <Searchbar/>
      </div>
      <MenuList/>
    </div>
  )
}

export default SidebarNav