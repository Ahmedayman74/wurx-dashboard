import React from "react";
import { Link } from "react-router-dom";

const MenuItem = ({
  icon,
  menuItemText,
  link,
  isActive,
  onClick,
  isSuperAdmin,
}) => {
  return (
    <Link className={`${!isSuperAdmin && `hidden`}`} to={`/${link}`}>
      <li
        onClick={onClick}
        className={`flex justify-normal text-gray-600 px-5 py-3 duration-500 hover:bg-violet-950 ${
          isActive ? "bg-violet-950 text-white" : "hover:text-white"
        }`}>
        {icon}
        <p className="ms-6">{menuItemText}</p>
      </li>
    </Link>
  );
};

export default MenuItem;
