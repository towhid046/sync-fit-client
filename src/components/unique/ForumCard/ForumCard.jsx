import PropTypes from "prop-types";
import { CiCalendar } from "react-icons/ci";
import { Link } from "react-router-dom";
import Reveal from "../../shared/Reveal/Reveal";

const ForumCard = ({ info = "" }) => {
  const { _id, thumbnail_img, title, release_date, description, author } = info;

  return (
    <Reveal>
      <div className="bg-white border shadow-sm justify-between flex flex-col">
        <figure className="relative overflow-hidden ">
          <Link to={`/forums-details/${_id}`}>
            <img
              className="h-60 duration-500 transition hover:scale-125 w-full object-cover"
              src={thumbnail_img}
              alt="News Image"
            />
          </Link>
        </figure>
        <div className="px-5 py-7 ">
          <div className=" space-y-4">
            <ul className="flex flex-wrap gap-4 justify-between items-start">
              <li className="flex items-center gap-2">
                <img
                  className="w-10 h-10 rounded-full object-cover"
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
            </ul>
            <hr className=" border-custom-primary opacity-20" />
            <h2 className="text-xl font-semibold mb-3">
              {title.split(" ").splice(0, 3).join(" ")}...
            </h2>
            <p className="text-gray-500">
              {description?.split("").splice(0, 55).join("")}...{" "}
              <Link
                to={`/forums-details/${_id}`}
                className="underline text-custom-primary italic"
              >
                Read More
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

ForumCard.propTypes = {
  info: PropTypes.object.isRequired,
};

export default ForumCard;
