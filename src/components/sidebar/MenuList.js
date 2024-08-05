import { Pencil, PieChart, Settings, User } from "lucide-react";
import MenuItem from "./MenuItem";


const MenuList = () => {
  return (
    <ul>
        <MenuItem icon={<PieChart />} menuItemText={"Dashboard"} link={"dashboard"}/>
        <MenuItem icon={<User />} menuItemText={"Add user"} link={"adduser"}/>
        <MenuItem icon={<Pencil />} menuItemText={"Edit user"} link={"edituser"}/>
        <MenuItem icon={<Settings />} menuItemText={"Settings"} link={"settings"}/>
    </ul>
  );
};

export default MenuList;
