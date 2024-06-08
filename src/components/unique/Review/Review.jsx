import { BiSolidDownArrow } from "react-icons/bi";
import { PiQuotes } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const Review = ({ review }) => {
  const { description, rating, author } = review;
  return (
    <div className={`space-y-7 max-w-5xl mx-3`}>
      <div className="bg-custom-secondary cursor-grab shadow-lg p-6 relative ">
        <div className="mb-2">
          <PiQuotes className="text-6xl text-custom-primary opacity-30 rotate-180 " />
        </div>
        <div>
          <h2 className="text-xl mb-2 font-medium">
            <em className="text-gray-700">Trainer Name:</em>{" "}
            <Link
            to={`${review?.trainerId ? `/trainer-details/${review?.trainerId}` : '/' }`}
             className="transaction duration-300 text-custom-primary font-semibold">{review?.trainerName || 'Unknown'}</Link>
          </h2>
        </div>
        <p className="text-gray-500 mb-2">
          {description.split("").slice(0, 109).join("")}
        </p>
        <span className="absolute -bottom-6 left-6 text-custom-secondary ">
          <BiSolidDownArrow className="text-4xl" />
        </span>
        <div className="mt-1 max-w-52 space-y-2 mx-auto text-center">
          <h2 className="text-lg font-bold italic">Rating</h2>
          <hr className="border-custom-primary opacity-20" />
          <div className="flex items-center gap-2 justify-center">
            <FaRegStar className="text-xl text-custom-primary" />
            <strong>{rating}</strong>
            <FaRegStar className="text-xl text-custom-primary" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <img className="w-11 h-11 rounded-full" src={author?.image} alt="Img" />
        <div>
          <h3 className="font-bold text-lg">{author?.name}</h3>
          <p className="text-gray-600 ">{author?.location}</p>
        </div>
      </div>
    </div>
  );
};

Review.propTypes = {
  review: PropTypes.object.isRequired,
};

export default Review;
