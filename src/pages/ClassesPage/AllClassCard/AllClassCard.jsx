import PropTypes from "prop-types";
import { CiStar } from "react-icons/ci";
import { MdOutlineBookmarkAdded } from "react-icons/md";
const AllClassCard = ({ singleClass }) => {
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
    <div className=" bg-custom-secondary transition duration-300 hover:-translate-y-2 shadow-sm">
      <figure className="relative">
        <img className="max-h-72 w-full" src={image} alt="" />
        <span className="bg-custom-primary px-4 py-1 text-white absolute top-4 right-4">
          ${price}
        </span>
      </figure>
      <div className="space-y-4 p-5">
        <div>
          <h2 className="text-3xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-500">{description}</p>
        </div>
        <hr className="border-custom-primary opacity-20" />
        <h2 className="text-2xl italic font-medium ">
          Trainer who took this class
        </h2>
        <div className="flex items-center gap-4">
          <img
            title={trainer.name || "Unknown"}
            src={trainer?.image}
            className="w-12 h-12 rounded-full"
            alt="Trainer"
          />
          <img
            title={trainer.name || "Unknown"}
            src={trainer?.image}
            className="w-12 h-12 rounded-full"
            alt="Trainer"
          />
          <img
            title={trainer.name || "Unknown"}
            src={trainer?.image}
            className="w-12 h-12 rounded-full"
            alt="Trainer"
          />
          <img
            title={trainer.name || "Unknown"}
            src={trainer?.image}
            className="w-12 h-12 rounded-full"
            alt="Trainer"
          />
        </div>
      </div>
    </div>
  );
};

AllClassCard.propTypes = {
  singleClass: PropTypes.object.isRequired,
};

export default AllClassCard;
