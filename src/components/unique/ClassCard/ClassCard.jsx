import PropTypes from "prop-types";
import { CiStar } from "react-icons/ci";
import { MdOutlineBookmarkAdded } from "react-icons/md";
const ClassCard = ({ singleClass }) => {
  const {
    id,
    image,
    title,
    description,
    totalBookings,
    price,
    rating,
    trainer,
  } = singleClass;

  return (
    <div className=" bg-white transition duration-300 hover:-translate-y-2 shadow-sm">
      <figure className="relative">
        <img className="max-h-72 w-full" src={image} alt="" />
        <span className="bg-custom-primary px-4 py-1 text-white absolute top-4 right-4">
          ${price}
        </span>
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
          <h2 className="text-3xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-500">{description}</p>
        </div>
        <hr className="border-custom-primary opacity-20" />
        <div className="flex items-center gap-4">
          <img
            src={trainer?.image}
            className="w-12 h-12 rounded-full"
            alt="Trainer"
          />
          <div>
            <h2 className="text-xl font-medium">{trainer.name || "Unknown"}</h2>
            <p className="text-gray-500 italic">{trainer?.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

ClassCard.propTypes = {
  singleClass: PropTypes.object.isRequired,
};

export default ClassCard;
