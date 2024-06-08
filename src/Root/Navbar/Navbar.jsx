import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ButtonPrimary from "./../../components/shared/ButtonPrimary/ButtonPrimary";
import useAuth from "../../hooks/useAuth";
import { Tooltip } from "react-tooltip";
import swal from "sweetalert";
import { BeatLoader } from "react-spinners";
import { BiSolidDownArrow } from "react-icons/bi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserRouteOpen, setIsUserRouteOpen] = useState(false);
  const { user, logOutUser, loading } = useAuth();
  const navigate = useNavigate();

  const handleCloseBothMenu = () => {
    setIsUserRouteOpen(false);
    setIsOpen(false);
  };
  const menus = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Trainers", link: "/all-trainers" },
    { id: 3, name: "Classes", link: "/all-classes" },

    // if the user role is admin then go to admin-dashboard:
    { id: 4, name: "Dashboard", link: "/trainer-dashboard" },
    { id: 5, name: "Community", link: "/all-forums" },
  ];

  const links = menus.map((menu) => (
    <li
      className={`hover:text-custom-primary transition duration-300 ${
        menu.name === "Dashboard" && !user ? "hidden" : "flex"
      }`}
      onClick={handleCloseBothMenu}
      key={menu.id}
    >
      <NavLink to={menu.link}>{menu.name}</NavLink>
    </li>
  ));

  const userRouteList = [
    { id: 1, name: "Activity Log", link: "/activity-log" },
    { id: 2, name: "Profile", link: "/user-profile" },
    { id: 3, name: "Booked Trainer", link: "/booked-trainer" },
  ];

  const userRoutes = userRouteList.map((list) => (
    <li
      onClick={handleCloseBothMenu}
      className={`hover:text-custom-primary transition duration-300`}
      key={list.id}
    >
      <NavLink to={list.link}>{list.name}</NavLink>
    </li>
  ));

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserImage = () => {
    setIsUserRouteOpen(!isUserRouteOpen);
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
      <div className="container relative px-4 mx-auto flex justify-between items-center">
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
            <BeatLoader
              color={"#ffffff"}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <>
              {user ? (
                <>
                  <div onClick={handleLogOutUser}>
                    <ButtonPrimary
                      customClass={"bg-gray-800 hover:border-custom-primary"}
                    >
                      Log Out
                    </ButtonPrimary>
                  </div>
                  <img
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={user?.displayName}
                    data-tooltip-place="bottom"
                    src={user?.photoURL}
                    alt="User"
                    className="user-profile-image-custom-class rounded-full cursor-pointer"
                    onClick={toggleUserImage}
                    onMouseOver={toggleUserImage}
                  />
                </>
              ) : (
                <Link to={"/login"}>
                  <ButtonPrimary
                    customClass={"bg-gray-800 hover:border-custom-primary"}
                  >
                    Log In
                  </ButtonPrimary>
                </Link>
              )}
            </>
          )}
        </div>

        {/* Responsive Menu */}
        {isOpen && (
          <div className="menu md:hidden list-none flex flex-col gap-4 text-white  left-4 top-24 p-10 items-center absolute bg-gray-800 w-max-max font-medium rounded-xl">
            <div className="absolute -top-5  left-4">
              <BiSolidDownArrow className="text-3xl text-gray-800 rotate-180" />
            </div>
            {links}
          </div>
        )}

        {/* User routes */}
        {isUserRouteOpen && (
          <div className="list-none flex flex-col gap-4 text-white p-10 pt-14 items-center absolute right-4 top-24 bg-gray-800 w-max-max font-medium">
            <div
              onClick={toggleUserImage}
              className="absolute left-5 top-5 cursor-pointer"
            >
              <FaTimes className="text-2xl text-wite-800 rotate-180" />
            </div>

            <div className="absolute -top-5 right-3">
              <BiSolidDownArrow className="text-3xl text-gray-800 rotate-180" />
            </div>
            {userRoutes}
          </div>
        )}

        <Tooltip id="my-tooltip" />
      </div>
    </nav>
  );
};

export default Navbar;
