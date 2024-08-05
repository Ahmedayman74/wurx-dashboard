import { FontSizeIcon } from "@radix-ui/react-icons";
import { Search } from "lucide-react";

const Searchbar = () => {
  return (
    <div className=" flex items-center justify-center lg:justify-normal my-2  bg-white rounded-sm lg:border border-gray-200 ">
      <Search className="text-gray-700 p-1" />
      <input className="py-2 px-5 hidden lg:block    focus:border-none rounded-sm  focus:outline-none " type="text" placeholder="Search" />
    </div>
  );
};

export default Searchbar;
