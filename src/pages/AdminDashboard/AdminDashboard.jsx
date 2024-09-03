import AdminNavbar from "./AdminNavbar/AdminNavbar";
import { Outlet } from "react-router-dom";
import CustomHelmet from './../../components/shared/CustomHelmet/CustomHelmet';

const AdminDashboard = () => {
  
  return (
    <div className="flex">
      <CustomHelmet title={"Admin Dashboard"} />
      <AdminNavbar />
      <main className="container mx-auto px-8 mt-8 mb-12">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
