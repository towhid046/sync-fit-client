import PropTypes from "prop-types";
import { CiCalendar } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaInstagram,FaLinkedin,FaFacebookF } from "react-icons/fa";

const TeamMember = ({ info = "" }) => {
  const { _id, thumbnail_img, title, release_date, description, author } = info;

  return (
    <div className="bg-custom-secondary team-card-special-class shadow-sm justify-between p-6 flex flex-col">
      <figure className="relative overflow-hidden flex items-enter justify-center rounded-tl-3xl rounded-br-3xl">
        <img className="h-60 w-full" src={author?.image} alt="News Image" />
        <div className="absolute bottom-4 left-4   flex gap-3 items-center">
        <button className="p-3 bg-custom-primary bg-opacity-70 transition  translate-y-16  duration-300 rounded-full ">
          <FaFacebookF className="text-white text-xl  " />
        </button>
        <button className="p-3 bg-custom-primary bg-opacity-70 duration-500 rounded-full transition  translate-y-16  ">
          <FaInstagram className="text-white text-xl  " />
        </button>
        <button className="p-3 bg-custom-primary bg-opacity-70 rounded-full duration-700 transition  translate-y-16 ">
          <FaLinkedin className="text-white text-xl  " />
        </button>
        </div>
      </figure>
      <div className="pt-5">
        <div className=" space-y-2">
          <h2 className="text-2xl font-bold mb-2">{author?.name}</h2>
          <p className="text-gray-500">
            <span className="italic">Expertise :</span>{" "}
            {description?.split(" ").splice(0, 3).join(", ")}
          </p>
          <p className="text-gray-500">
            <span className="italic">Biography :</span>{" "}
            {description?.split("").splice(0, 55).join("")}...{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

TeamMember.propTypes = {
  info: PropTypes.object.isRequired,
};

export default TeamMember;
