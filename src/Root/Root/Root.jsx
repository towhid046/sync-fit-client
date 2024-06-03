import { Outlet } from "react-router-dom";
import Navbar from "./../Navbar/Navbar";
import NavTop from "./../Navbar/NavTop";
import Footer from "./../Footer/Footer";

const Root = () => {
  return (
    <>
      <NavTop />
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Root;
