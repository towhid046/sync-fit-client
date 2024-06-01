import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import ButtonPrimary from "./../../components/shared/ButtonPrimary/ButtonPrimary";
import useAuth from "../../hooks/useAuth";
import { Tooltip } from "react-tooltip";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOutUser } = useAuth();

  const menus = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Trainers", link: "/all-trainers" },
    { id: 3, name: "Classes", link: "/all-classes" },
    { id: 4, name: "Dashboard", link: "/dashboard" },
    { id: 5, name: "Community", link: "/community" },
  ];

  const links = menus.map((menu) => (
    <li
      className="hover:text-custom-third transition duration-300"
      onClick={() => setIsOpen(false)}
      key={menu.id}
    >
      <NavLink to={menu.link}>{menu.name}</NavLink>
    </li>
  ));

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOutUser = async () => {
    try {
      await logOutUser();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <nav className="bg-custom-primary py-5 w-full sticky z-10 top-0">
      <div className="container px-4 mx-auto flex justify-between items-center">
        {/* Left side: Toggle Button and Website Name */}
        <div className="flex items-center">
          <button onClick={toggleNavbar} className="md:hidden text-white mr-4">
            {isOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
          <Link
            to={"/"}
            className="text-custom-third cursor-pointer font-bold text-3xl"
          >
            Sync<span className="text-custom-secondary">Fit</span>
          </Link>
        </div>

        {/* Middle: Menu Items */}
        <div className="menu hidden md:flex flex-grow justify-center list-none gap-6 text-white font-medium">
          {links}
        </div>

        {/* Right side: User Image */}
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <div onClick={handleLogOutUser}>
                <ButtonPrimary>Log Out</ButtonPrimary>
              </div>
              <img
                data-tooltip-id="my-tooltip"
                data-tooltip-content={user?.displayName}
                data-tooltip-place="bottom"
                src={user?.photoURL}
                alt="User"
                className="user-profile-image-custom-class rounded-full cursor-pointer"
              />
            </>
          ) : (
            <Link to={"/login"}>
              <ButtonPrimary>Log In</ButtonPrimary>
            </Link>
          )}
        </div>
      </div>

      {/* Responsive Menu */}
      {isOpen && (
        <div className="menu md:hidden list-none flex flex-col gap-4 text-white p-10 items-center absolute bg-custom-primary w-full font-medium">
          {links}
        </div>
      )}

      <Tooltip id="my-tooltip" />
    </nav>
  );
};

export default Navbar;
