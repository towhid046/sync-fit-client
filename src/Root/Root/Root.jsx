import { Outlet } from "react-router-dom";
import Navbar from "./../Navbar/Navbar";
import NavTop from "./../Navbar/NavTop";

const Root = () => {
  return (
    <>
      <NavTop />
      <Navbar />
      <Outlet />
    </>
  );
};

export default Root;
