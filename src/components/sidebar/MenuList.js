import React, { useState } from "react";
import { Pencil, PieChart, Settings, User } from "lucide-react";
import MenuItem from "./MenuItem";

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([
    {
      icon: <PieChart />,
      menuItemText: "Dashboard",
      link: "dashboard",
      isActive: false,
    },
    {
      icon: <User />,
      menuItemText: "Add user",
      link: "adduser",
      isActive: false,
    },
    // {
    //   icon: <Pencil />,
    //   menuItemText: "Edit User",
    //   link: "edituser",
    //   isActive: false,
    // },
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
        />
      ))}
    </ul>
  );
};

export default MenuList;

