import PropTypes from "prop-types";
import { CiCalendar } from "react-icons/ci";
import { Link } from "react-router-dom";

const TeamMember = ({ info = "" }) => {
  const { _id, thumbnail_img, title, release_date, description, author } = info;

  return (
    <div className="bg-white transition duration-500 hover:-translate-y-2 shadow-sm justify-between p-6 flex flex-col">
      <figure className="relative overflow-hidden flex items-enter justify-center rounded-tl-3xl rounded-br-3xl">
        <img className="h-60 w-full" src={author?.image} alt="News Image" />
      </figure>
      <div className="pt-5">
        <div className=" space-y-2">
          {/* <ul className="flex flex-wrap gap-4 justify-between items-start">
            <li className="flex items-center gap-2">
              <img
                className="w-10 h-10 rounded-full"
                src={author?.image}
                alt=""
              />
              <div>
                <span className="text- font-semibold text-md">
                  {author?.name}
                </span>
                <p>
                  <em>
                    <small className="text-gray-400">Germany</small>
                  </em>
                </p>
              </div>
            </li>
            <li className="flex items-center gap-2">
              <CiCalendar className="text-custom-primary text-xl" />
              <small className="text-gray-400">{release_date}</small>
            </li>
          </ul> */}
          {/* <hr className=" border-custom-primary opacity-20" /> */}
          <h2 className="text-2xl font-bold mb-2">{author?.name}</h2>
          <p className="text-gray-500">
            <span className="italic">Expertise :</span>{" "}
            {description?.split(" ").splice(0, 3).join(", ")}
          </p>
          <p className="text-gray-500">
            <span className="italic">Biography :</span>{" "}
            {description?.split("").splice(0, 55).join("")}...{" "}
            <Link
              to={`/forums-details/${_id}`}
              className="underline text-custom-primary italic"
            >
              Know Details
            </Link>
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
