import PropTypes from "prop-types";
import { CiStar } from "react-icons/ci";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import Reveal from "../../shared/Reveal/Reveal";
const ClassCard = ({ singleClass }) => {
  const { image, class_name, description, rating, totalBookings } = singleClass;

  return (
    <Reveal>
      <div className=" bg-white border flex flex-col">
        <figure className="relative overflow-hidden">
          <img
            className="max-h-72 w-full object-cover transition-all duration-500 hover:scale-125"
            src={image}
            alt=""
          />
        </figure>
        <div className="space-y-4 p-5">
          <ul className="list-none flex items-center  gap-12 flex-wrap">
            <li className="flex items-center gap-2">
              <CiStar className="text-xl text-custom-primary" />
              <span className="text-gray-400">{rating} Stars</span>
            </li>
            <li className="flex items-center gap-2">
              <MdOutlineBookmarkAdded className="text-lg text-custom-primary" />
              <span className="text-gray-400">{totalBookings} Booked</span>
            </li>
          </ul>
          <div>
            <h2 className="text-3xl font-semibold mb-2">{class_name}</h2>
            <p className="text-gray-500">
              {description.split(" ").slice(0, 10).join(" ")}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

ClassCard.propTypes = {
  singleClass: PropTypes.object.isRequired,
};

export default ClassCard;
