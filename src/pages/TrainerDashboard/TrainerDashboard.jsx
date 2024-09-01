import TrainerNavbar from "./TrainerNavbar/TrainerNavbar";
import { Outlet } from "react-router-dom";
import CustomHelmet from './../../components/shared/CustomHelmet/CustomHelmet';

const TrainerDashboard = () => {
  
  return (
    <div className="flex">
      <CustomHelmet title={'Trainer Dashboard'}/>
      <TrainerNavbar />
      <main className="container mx-auto px-8 mt-8 mb-12">
        <Outlet />
      </main>
    </div>
  );
};

export default TrainerDashboard;