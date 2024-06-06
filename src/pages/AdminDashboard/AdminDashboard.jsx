import AdminNavbar from "./AdminNavbar/AdminNavbar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex gap-7">
      <AdminNavbar />
      <main className="container mx-auto px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
