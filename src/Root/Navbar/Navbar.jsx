import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ButtonPrimary from "./../../components/shared/ButtonPrimary/ButtonPrimary";
import useAuth from "../../hooks/useAuth";
import { Tooltip } from "react-tooltip";
import swal from "sweetalert";
import { BiSolidDownArrow } from "react-icons/bi";
import useUserRole from "../../hooks/useUserRole";
import { menus, userRouteList } from "../../lib/navbarData";
import ResponsiveMenu from "./ResponsiveMenu/ResponsiveMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserRouteOpen, setIsUserRouteOpen] = useState(false);
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  const { userRole, setUserRole } = useUserRole();
  const handleCloseBothMenu = () => {
    setIsUserRouteOpen(false);
    setIsOpen(false);
  };

  const links = menus.map((menu) => (
    <NavLink to={menu.link} className="inline-block">
      <li
        className={`transition duration-300 md:py-0 md:hover:text-custom-primary md:hover:bg-gray-800 hover:bg-gray-700 md:px-0 py-2 px-10 `}
        onClick={handleCloseBothMenu}
        key={menu.id}
      >
        {menu.name}
      </li>
    </NavLink>
  ));

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
    if (userRole !== "Member") {
      setIsUserRouteOpen(false);
      return;
    }
    setIsUserRouteOpen(!isUserRouteOpen);
  };

  const handleLogOutUser = async () => {
    try {
      await logOutUser();
      setUserRole("Member");
      swal("Log out", "You have log Out successfully!!", "success");
      navigate("/");
    } catch (error) {
      swal("Error", `${error.message}`, "error");
    }
  };

  return (
    <>
      <nav className="bg-gray-800 py-5 w-full sticky z-50 top-0">
        <div className="container relative px-4 mx-auto flex justify-between items-center">
          {/* Left side: Toggle Button and Website Name */}
          <div className="flex items-center">
            <button
              onClick={toggleNavbar}
              className="md:hidden text-white mr-4"
            >
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
            {userRole === "Admin" && (
              <li
                className={`hover:text-custom-primary transition duration-300 `}
                onClick={handleCloseBothMenu}
              >
                <NavLink to={"admin-dashboard"}>Dashboard</NavLink>
              </li>
            )}
            {userRole === "Trainer" && (
              <li
                className={`hover:text-custom-primary transition duration-300 `}
                onClick={handleCloseBothMenu}
              >
                <NavLink to={"trainer-dashboard"}>Dashboard</NavLink>
              </li>
            )}
          </div>

          {/* Right side: User Image */}
          <div className="flex gap-4 items-center">
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
          </div>

          {/* User routes */}
          {user && (
            <>
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
            </>
          )}

          <Tooltip id="my-tooltip" />
        </div>
      </nav>
      {/* Responsive Menu */}
      {isOpen && (
        <ResponsiveMenu
          handleCloseBothMenu={handleCloseBothMenu}
          setIsOpen={setIsOpen}
          links={links}
          userRole={userRole}
        />
      )}
    </>
  );
};

export default Navbar;
