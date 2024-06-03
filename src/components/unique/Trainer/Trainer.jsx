import PropTypes from "prop-types";
import { CiStar } from "react-icons/ci";
import { FaInstagram, FaLinkedin, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CiDumbbell } from "react-icons/ci";
import ButtonPrimary from "./../../shared/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "./../../shared/ButtonSecondary/ButtonSecondary";

const Trainer = ({ trainer }) => {
  const {
    _id,
    name,
    image,
    yearsOfExperience,
    socialLinks,
    availableSlots,
    biography,
    areaOfExpertise,
    rating,
  } = trainer;

  const socialItems = [
    { id: 1, icon: <FaFacebookF />, link: socialLinks.facebook, animTime: 300 },
    {
      id: 2,
      icon: <FaInstagram />,
      link: socialLinks.instagram,
      animTime: 500,
    },
    { id: 3, icon: <FaLinkedin />, link: socialLinks.linkedin, animTime: 700 },
  ];

  const allSocialItems = socialItems?.map((item) => (
    <button
      key={item.id}
      className={`p-3 bg-custom-primary bg-opacity-70 transition  translate-y-16  duration-${item.animTime} rounded-full `}
    >
      <Link target="_blank" to={item.link}>
        <span className="text-white text-xl  ">{item.icon}</span>
      </Link>
    </button>
  ));

  const slotItems = availableSlots?.map((slot) => (
    <button
      className={`py-2 px-4 font-medium text-gray-500 border transition duration-500 hover:bg-gray-200 hover:text-gray-600 `}
      key={slot}
    >
      {slot}
    </button>
  ));

  return (
    <div className=" bg-white  shadow-sm p-5 team-card-special-class ">
      <figure className="relative overflow-hidden flex items-enter justify-center rounded-tl-3xl rounded-br-3xl">
        <img className="h-60 w-full" src={image} alt="News Image" />
        <div className="absolute bottom-4 left-4   flex gap-3 items-center z-20">
          {allSocialItems}
        </div>
        <p className="bg-black opacity-50 trainer-overlay-class  w-[100%] bottom-0 h-0 transition absolute z-10"></p>
      </figure>

      <div className="space-y-4 mt-5">
        <ul className="list-none flex items-center  gap-12 flex-wrap">
          <li className="flex items-center gap-2">
            <CiStar className="text-xl text-custom-primary" />
            <span className="text-gray-400">{rating} Stars</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-gray-400">
              {yearsOfExperience} <p>
              years of experiences
              </p>
            </span>
          </li>
        </ul>
        <div>
          <h2 className="text-3xl font-semibold mb-2">{name}</h2>
          <div>
            <p className="text-lg  text-custom-primary font-medium mb-2 italic">
              Available Slots:
            </p>
            <ul className="space-y-1">{slotItems}</ul>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <Link to={`/trainer-details/${_id}`}>
          <ButtonPrimary customClass={"w-full border-custom-primary py-2.5"}>
            Know More
          </ButtonPrimary>
        </Link>
      </div>
    </div>
  );
};

Trainer.propTypes = {
  trainer: PropTypes.object.isRequired,
};

export default Trainer;
