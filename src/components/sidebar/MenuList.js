import React, { useState } from "react";
import { Building, User } from "lucide-react";
import MenuItem from "./MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../rtk/slices/sidebar-slice";

const MenuList = () => {
  // const auth = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const dispatch = useDispatch();
  const sidebartoggle = useSelector((state) => state.sidebar.isOpen);
  const [menuItems, setMenuItems] = useState([
    {
      icon: <User />,
      menuItemText: "Users",
      link: "dashboard",
      isActive: true,
      isSuperAdmin: true,
    },
    {
      icon: <Building />,
      menuItemText: "Companies",
      link: "companies",
      isActive: false,
      isSuperAdmin: role === "superAdmin",
    },
    // {
    //   icon: <Settings />,
    //   menuItemText: "Settings",
    //   link: "settings",
    //   isActive: false,
    // },
  ]);

  const handleItemClick = (index) => {
    // Create a copy of the menu items array
    const updatedItems = [...menuItems];
    // Reset all items to inactive
    updatedItems.forEach((item, i) => {
      updatedItems[i].isActive = false;
    });

    // Set the clicked item to active
    updatedItems[index].isActive = true;

    // Update state with the modified array
    setMenuItems(updatedItems);

    sidebartoggle && dispatch(toggleSidebar());
  };

  return (
    <ul>
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          icon={item.icon}
          menuItemText={item.menuItemText}
          link={item.link}
          isActive={item.isActive}
          onClick={() => handleItemClick(index)}
          isSuperAdmin={item.isSuperAdmin}
        />
      ))}
    </ul>
  );
};

export default MenuList;
