import React, { useState } from "react";
import { Pencil, PieChart, Settings, User } from "lucide-react";
import MenuItem from "./MenuItem";
import { useSelector } from "react-redux";

const MenuList = () => {
  const auth = useSelector((state) => state.auth);
  const [menuItems, setMenuItems] = useState([
    {
      icon: <User />,
      menuItemText: "Users",
      link: "dashboard",
      isActive: false,
      isSuperAdmin : true
    },
    {
      icon: <Pencil />,
      menuItemText: "Companies",
      link: "companies",
      isActive: false,
      isSuperAdmin : auth.role === "superAdmin"
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

