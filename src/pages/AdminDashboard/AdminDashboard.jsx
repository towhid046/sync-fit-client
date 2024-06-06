import AdminNavbar from "./AdminNavbar/AdminNavbar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex gap-8">
      <AdminNavbar />
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
