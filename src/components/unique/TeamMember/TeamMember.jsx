import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaFacebookF } from "react-icons/fa";

const socialIcons = [FaFacebookF, FaLinkedin, FaInstagram];
const TeamMember = ({ info = "" }) => {
  const { _id, thumbnail_img, title, release_date, description, author } = info;

  return (
    <div className="bg-custom-secondary team-card-special-class justify-between p-6 flex flex-col border">
      <figure className="relative overflow-hidden flex items-center justify-center rounded-tl-3xl rounded-br-3xl">
        <img className="h-60 w-full object-cover" src={author?.image} alt="News Image" />
        <div className="absolute bottom-4 left-4 flex gap-3 items-center">
          {socialIcons.map((Icon, index) => (
            <button
              key={index}
              className={`p-3 bg-custom-primary hover:bg-opacity-90 bg-opacity-70 transition translate-y-16 
                ${index === 0 && 'duration-300'}
                ${index === 1 && 'duration-500'}
                ${index === 2 && 'duration-700'}
                 rounded-full`}
            >
              <Icon className="text-white text-xl" />
            </button>
          ))}
        </div>
      </figure>
      <div className="pt-5">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold mb-2">{author?.name}</h2>
          <p className="text-gray-500">
            <span className="italic">Expertise :</span>{" "}
            {description?.split(" ").splice(0, 3).join(", ")}
          </p>
          <p className="text-gray-500">
            <span className="italic">Biography :</span>{" "}
            {description?.split("").splice(0, 55).join("")}...
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
