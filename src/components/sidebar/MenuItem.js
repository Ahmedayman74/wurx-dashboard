import { Link } from "react-router-dom";

const MenuItem = ({ icon, menuItemText , link }) => {
  return (
    <Link to={`/${link}`}>
      <li
        onClick={(e) => {
          document.querySelectorAll("ul li").forEach((item) => {
            item.classList.remove("bg-violet-950");
            item.classList.remove("text-white");
          });

          document.querySelectorAll("ul li svg").forEach((icon) => {
            icon.classList.remove("bg-violet-950");
            icon.classList.remove("text-white");
          });

          e.target.classList.add("bg-violet-950");
          e.target.classList.add("text-white");
        }}
        className="flex items-center justify-center lg:justify-normal  text-gray-600 px-5 py-3 duration-500  hover:bg-violet-950 hover:text-white">
        {icon}
        <p className="ms-6 hidden lg:block">{menuItemText}</p>
      </li>
    </Link>
  );
};

export default MenuItem;
