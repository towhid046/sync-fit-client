import AdminNavbar from "./AdminNavbar/AdminNavbar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  
  return (
    <div className="flex">
      <AdminNavbar />
      <main className="container mx-auto px-8 mt-8 mb-12">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
