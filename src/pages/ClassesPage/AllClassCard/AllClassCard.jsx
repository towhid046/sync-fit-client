import PropTypes from "prop-types";
import { CiStar } from "react-icons/ci";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import usePublicData from './../../../hooks/usePublicData';
import LoadingSpinner from "../../../components/shared/LoadingSpinner/LoadingSpinner";

const AllClassCard = ({ singleClass }) => {
  const {
    image,
    class_name,
    description,
  } = singleClass;

  return (
    <div className=" bg-custom-secondary transition duration-300 hover:-translate-y-2 shadow-sm">
      <figure className="relative">
        <img className="max-h-72 w-full" src={image} alt="" />
      </figure>
      <div className="space-y-4 p-5">
        <div>
          <h2 className="text-3xl font-semibold mb-2">{class_name}</h2>
          <p className="text-gray-500">{description}</p>
        </div>
        <hr className="border-custom-primary opacity-20" />
        <h2 className="text-2xl italic font-medium ">
          Trainer who took this class
        </h2>
        <div className="flex items-center gap-5">
         <figure
         data-tooltip-id="my-tooltip" data-tooltip-content="Trainer Name"
         className="border-4 rounded-full border-custom-primary border-opacity-50 cursor-pointer">
         <img
            title={"Trainer Name"}
            src={'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=600'}
            className="w-12 h-12 rounded-full"
            alt="Trainer"
          />
         </figure>
         <figure
         data-tooltip-id="my-tooltip" data-tooltip-content="Trainer Name"
         className="border-4 rounded-full border-custom-primary border-opacity-50 cursor-pointer">
         <img
            title={"Trainer Name"}
            src={'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=600'}
            className="w-12 h-12 rounded-full"
            alt="Trainer"
          />
         </figure>
         <figure
         data-tooltip-id="my-tooltip" data-tooltip-content="Trainer Name"
         className="border-4 rounded-full border-custom-primary border-opacity-50 cursor-pointer">
         <img
            title={"Trainer Name"}
            src={'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=600'}
            className="w-12 h-12 rounded-full"
            alt="Trainer"
          />
         </figure>
        </div>
      </div>
    </div>
  );
};

AllClassCard.propTypes = {
  singleClass: PropTypes.object.isRequired,
};

export default AllClassCard;
