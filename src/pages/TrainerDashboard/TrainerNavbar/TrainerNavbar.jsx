import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Tooltip } from "react-tooltip";
import swal from "sweetalert";

const TrainerNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOutUser, loading } = useAuth();
  const navigate = useNavigate();

  const menus = [
    { id: 1, name: "Manage Slots", link: "/trainer-dashboard/manage-slots" },
    { id: 3, name: "Add New Slot", link: "/trainer-dashboard/add-new-slot" },
    { id: 2, name: "Add New Forum", link: "/trainer-dashboard/add-new-forum" },
    { id: 5, name: "Balance", link: "/admin-dashboard/balance" },
    { id: 6, name: "Add Class", link: "/admin-dashboard/add-new-class" },
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
    <nav className="bg-gray-800 container  mx-left p-12 max-w-max">
      <div className="container space-y-5 relative ">
        {/* Left side: Toggle Button and Website Name */}
        <div className=" ">
          <button onClick={toggleNavbar} className="md:hidden text-white mr-4">
            {isOpen ? (
              <FaTimes className="text-2xl " />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>

        {/* Middle: Menu Items */}

        <div className="menu hidden md:flex flex-col list-none gap-3 text-white font-medium ">
          <Link
            to={"/"}
            className="text-custom-primary cursor-pointer font-bold text-3xl"
          >
            Sync<span className="text-custom-secondary">Fit</span>
          </Link>
          {links}
          <br />
          <hr />
          <br />
          {links}
        </div>
      </div>

      {/* Responsive Menu */}
      {isOpen && (
        <div className="menu md:hidden space-y-10">
          <Link
            to={"/"}
            className="text-custom-primary cursor-pointer font-bold text-3xl"
          >
            Sync<span className="text-custom-secondary">Fit</span>
          </Link>
          <div className="menu list-none flex flex-col gap-3 text-white  bg-gray-800 w-full font-medium">
            {links}
            <br />
            <hr />
            <br />
          {links}
          </div>
        </div>
      )}

      <Tooltip id="my-tooltip" />
    </nav>
  );
};

export default TrainerNavbar;