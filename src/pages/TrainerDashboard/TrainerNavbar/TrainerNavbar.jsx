import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Tooltip } from "react-tooltip";

const TrainerNavbar = () => {
  const { user } = useAuth();

  const menus = [
    { id: 1, name: "Manage Slots", link: "/trainer-dashboard/manage-slots" },
    { id: 3, name: "Add New Slot", link: "/trainer-dashboard/add-new-slot" },
    { id: 2, name: "Add New Forum", link: "/trainer-dashboard/add-new-forum" },
  ];
  const menus2 = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Trainers", link: "/all-trainers" },
    { id: 3, name: "Classes", link: "/all-classes" },
    { id: 5, name: "Community", link: "/all-forums" },
  ];

  const links2 = menus2.map((menu) => (
    <li
      className={`hover:text-custom-primary lg:mb-0 mb-3 transition duration-300 ${
        menu.name === "Dashboard" && !user ? "hidden" : "flex"
      }`}
      key={menu.id}
    >
      <NavLink to={menu.link}>{menu.name}</NavLink>
    </li>
  ));
  const links = menus.map((menu) => (
    <li
      className={`hover:text-custom-primary lg:mb-0 mb-3 transition duration-300 ${
        menu.name === "Dashboard" && !user ? "hidden" : "flex"
      }`}
      key={menu.id}
    >
      <NavLink to={menu.link}>{menu.name}</NavLink>
    </li>
  ));

  return (
    <nav className="bg-gray-800 container  mx-left p-12 max-w-max min-h-screen">
      <div className="container space-y-5 relative ">
        <div className="menu md:flex flex-col list-none gap-3 text-white font-medium ">
          <div className="mb-8">
            <Link
              to={"/"}
              className="text-custom-primary cursor-pointer font-bold text-3xl"
            >
              Sync<span className="text-custom-secondary">Fit</span>
            </Link>
          </div>
          {links}
          <br />
          <hr />
          <br />
          {links2}
        </div>
      </div>

      <Tooltip id="my-tooltip" />
    </nav>
  );
};

export default TrainerNavbar;
