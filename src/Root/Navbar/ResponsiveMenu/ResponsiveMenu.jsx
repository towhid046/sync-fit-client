import { NavLink } from "react-router-dom";
import { BiSolidDownArrow } from "react-icons/bi";
const ResponsiveMenu = ({
  setIsOpen,
  handleCloseBothMenu,
  links,
  userRole,
}) => {
  return (
    <div
      onClick={() => setIsOpen(false)}
      className=" md:hidden left-0 top-18 items-center fixed z-50 bg-black  h-full w-full bg-opacity-90"
    >
      <ul
        onClick={(e) => e.stopPropagation()}
        className="menu ml-4 mt-8  py-6 list-none flex flex-col text-white max-w-max   bg-gray-800 w-max-max font-medium  relative"
      >
        <div className="absolute -top-5  left-4">
          <BiSolidDownArrow className="text-3xl text-gray-800 rotate-180" />
        </div>

        {links}

        {userRole === "Admin" && (
          <NavLink to={"admin-dashboard"} className="inline-block z-40">
            <li
              className={`transition duration-300 md:py-0 md:hover:text-custom-primary md:hover:bg-gray-800 hover:bg-gray-700 md:px-0 py-2 px-10 `}
              onClick={handleCloseBothMenu}
            >
              Dashboard
            </li>
          </NavLink>
        )}
        {userRole === "Trainer" && (
          <NavLink to={"trainer-dashboard"} className="inline-block z-40">
            <li
              className={`transition duration-300 md:py-0 md:hover:text-custom-primary md:hover:bg-gray-800 hover:bg-gray-700 md:px-0 py-2 px-10 `}
              onClick={handleCloseBothMenu}
            >
              Dashboard
            </li>
          </NavLink>
        )}
      </ul>
    </div>
  );
};

export default ResponsiveMenu;
