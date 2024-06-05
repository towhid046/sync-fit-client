import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ButtonPrimary from "./../../components/shared/ButtonPrimary/ButtonPrimary";
import useAuth from "../../hooks/useAuth";
import { Tooltip } from "react-tooltip";
import swal from "sweetalert";
import LoadingSpinner from "../../components/shared/LoadingSpinner/LoadingSpinner";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOutUser, loading } = useAuth();
  const navigate = useNavigate();

  const menus = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Trainers", link: "/all-trainers" },
    { id: 3, name: "Classes", link: "/all-classes" },
    { id: 4, name: "Dashboard", link: "/dashboard" },
    { id: 5, name: "Community", link: "/community" },
  ];

  const links = menus.map((menu) => (
    <li
      className={`hover:text-custom-primary transition duration-300 ${
        menu.name === "Dashboard" && !user ? "hidden" : "flex"
      }`}
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
      swal("Log out", "You have log Out successfully!!", "success");
      navigate("/");
    } catch (error) {
      swal("Error", `${error.message}`, "error");
    }
  };

  return (
    <nav className="bg-gray-800 py-5 w-full sticky z-50 top-0">
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
            className="text-custom-primary cursor-pointer font-bold text-3xl"
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
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {user ? (
                <>
                  <div onClick={handleLogOutUser}>
                    <ButtonPrimary
                    customClass={'bg-gray-800 hover:border-custom-primary'}
                    >Log Out</ButtonPrimary>
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
                  <ButtonPrimary customClass={'bg-gray-800 hover:border-custom-primary'}>Log In</ButtonPrimary>
                </Link>
              )}
            </>
          )}
        </div>
      </div>

      {/* Responsive Menu */}
      {isOpen && (
        <div className="menu md:hidden list-none flex flex-col gap-4 text-white p-10 items-center absolute bg-gray-800 w-full font-medium">
          {links}
        </div>
      )}

      <Tooltip id="my-tooltip" />
    </nav>
  );
};

export default Navbar;
