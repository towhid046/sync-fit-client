import PropTypes from "prop-types";
import { CiStar } from "react-icons/ci";
import { FaInstagram, FaLinkedin, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CiDumbbell } from "react-icons/ci";
import ButtonPrimary from "./../../shared/ButtonPrimary/ButtonPrimary";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

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
    age,
  } = trainer;

  const socialItems = [
    { id: 1, icon: <FaFacebookF />, link: socialLinks?.facebook, animTime: 300 },
    {
      id: 2,
      icon: <FaInstagram />,
      link: socialLinks?.instagram,
      animTime: 500,
    },
    { id: 3, icon: <FaLinkedin />, link: socialLinks?.linkedin, animTime: 700 },
  ];

  const allSocialItems = socialItems?.map((item) => (
    <button
      key={item.id}
      className={`p-2.5 bg-custom-primary bg-opacity-70 transition  translate-y-20  duration-${item.animTime} rounded-full `}
    >
      <Link target="_blank" to={item.link}>
        <span className="text-white text-xl  ">{item.icon}</span>
      </Link>
    </button>
  ));

  const slotItems = availableSlots?.slice(0,2).map((slot) => (
    <li key={slot} className="flex items-center gap-2">
      <IoCheckmarkDoneOutline className="text-custom-primary text-2xl" />
      <span className="text-gray-500">{slot}</span>
    </li>
  ));

  return (
    <div className=" bg-white flex flex-col justify-between shadow-sm p-5 team-card-special-class ">
      <figure className="relative overflow-hidden flex items-enter justify-center  mt-7 h-64 w-64  mx-auto rounded-full">
        <img className="h-64 w-64 rounded-full object-cover" src={image} alt="News Image" />
        <div className="absolute bottom-8 left-14  flex gap-2 items-center z-20">
          {allSocialItems}
        </div>
        <p className="bg-black opacity-50 trainer-overlay-class  w-[100%] bottom-0 h-0 transition absolute z-10"></p>
      </figure>

      <div className="space-y-4 mt-5">
        <ul className="list-none flex items-center gap-3 flex-wrap">
          <li className="flex items-center gap-2">
            <CiStar className="text-xl text-custom-primary" />
            <span className="text-gray-400">Ages: {age || 'Unknown'}</span>
          </li>
          <li className="flex items-center gap-2">
            <CiDumbbell className="text-xl text-custom-primary -rotate-45" />
            <span className="text-gray-400">
              {yearsOfExperience} {' '}
              years of experiences
            </span>
          </li>
        </ul>
        <div>
          <h2 className="text-3xl font-semibold mb-2">{name}</h2>
          <div>
            <p className="text-lg  text-custom-primary opacity-80 font-medium mb-2 italic">
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
