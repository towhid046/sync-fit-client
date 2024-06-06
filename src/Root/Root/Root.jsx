import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./../Navbar/Navbar";
import NavTop from "./../Navbar/NavTop";
import Footer from "./../Footer/Footer";

const Root = () => {
  const location = useLocation();
  const pathName = location.pathname === "/dashboard" ? true : false;

  return (
    <>
      {!pathName && (
        <>
          <NavTop />
          <Navbar />
        </>
      )}
      <main className="min-h-screen">
        <Outlet />
      </main>
      {!pathName && <Footer />}
    </>
  );
};

export default Root;
