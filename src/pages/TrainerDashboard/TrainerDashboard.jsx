import TrainerNavbar from "./TrainerNavbar/TrainerNavbar";
import { Outlet } from "react-router-dom";

const TrainerDashboard = () => {
  
  return (
    <div className="flex">
      <TrainerNavbar />
      <main className="container mx-auto px-8 mt-8 mb-12">
        <Outlet />
      </main>
    </div>
  );
};

export default TrainerDashboard;