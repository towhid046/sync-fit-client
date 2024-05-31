import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import ButtonPrimary from "./../../components/shared/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../components/shared/ButtonSecondary/ButtonSecondary";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

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
          <span className="text-white cursor-pointer font-bold text-3xl">
            Rig<span className="text-custom-secondary">Fit</span>
          </span>
        </div>

        {/* Middle: Menu Items */}
        <div className="menu hidden md:flex flex-grow justify-center list-none gap-6 text-white font-medium">
          {links}
        </div>

        {/* Right side: User Image */}
        <div className="flex gap-4">
          <Link>
            <ButtonPrimary>Log In</ButtonPrimary>
          </Link>
          <Link>
            <ButtonSecondary>Log Out</ButtonSecondary>
          </Link>

          <img src="/" alt="User" className="w-8 h-8 rounded-full mr-2" />
        </div>
      </div>

      {/* Responsive Menu */}
      {isOpen && (
        <div className="menu md:hidden mt-2 list-none flex flex-col gap-4 text-white p-10 items-center fixed bg-custom-primary w-full font-medium">
          {links}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
