import { CiCalendar } from "react-icons/ci";
import { useEffect, useState } from "react";

import { FaArrowUp, FaArrowDown } from "react-icons/fa6";

import PropTypes from "prop-types";
import { scrollToTop } from "../../../utilities/scrollToTop";
import { BarLoader } from "react-spinners";

const AllForumCard = ({ forum, handleUpVote, handleDownVote, loading }) => {
  const [isVoteChange, setIsVoteChange] = useState(false);
  const [isDownVote, setIsDownVote] = useState(false);

  useEffect(() => {
    scrollToTop();
  }, []);

  const {
    _id,
    thumbnail_img,
    title,
    release_date,
    description,
    author,
    up_vote_count,
    down_vote_count,
  } = forum;

  const [initialDes, setInitialDes] = useState(
    description?.split(" ").slice(0, 20).join(" ")
  );

  const handleShowFullDescription = () => {
    setInitialDes(description);
  };

  const handleToUpVote = async (id) => {
    const success = await handleUpVote(id);
    if (success === false) {
      return;
    }

    setIsVoteChange(!isVoteChange);
    if (isDownVote) {
      setIsDownVote(false);
    }
  };

  const handleToDownVote = async (id) => {
    const successDownVote = await handleDownVote(id);
    if (successDownVote === false) {
      return;
    }

    setIsDownVote(!isDownVote);
    if (isVoteChange) {
      setIsVoteChange(false);
    }
  };

  return (
    <section className="mb-16">
      <div className="max-w-3xl mx-auto">
        <article className="border border-custom-primary  border-opacity-5 justify-between flex flex-col">
          {/* forum article text */}
          <div className="p-5">
            <div className=" space-y-4">
              <ul className="flex flex-wrap gap-4 justify-between items-start">
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
              </ul>
              <hr className="border-custom-primary opacity-20" />
              <h2 className="text-xl font-semibold mb-3">{title}</h2>
              <p>
                {initialDes}
                <em
                  onClick={handleShowFullDescription}
                  className={`${
                    initialDes.split(" ").length > 20 && "hidden"
                  } text-custom-primary cursor-pointer`}
                >
                  {" "}
                  ...see more
                </em>
              </p>
            </div>
          </div>

          {/* forum article image */}
          <figure className="relative overflow-hidden md:p-4">
            <img
              className="max-h-80 w-full"
              src={thumbnail_img}
              alt="News Image"
            />
          </figure>

          {/* forum votes */}
          <div className="flex items-center border max-w-max m-4 bg-gray-800 bg-opacity-90 text-white">
            <button
              onClick={() => handleToUpVote(_id)}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Up-vote"
              className={`flex items-center gap-1 border-r p-3 ${
                isVoteChange && "text-custom-primary"
              }`}
            >
              {loading ? (
                <BarLoader
                  color={"#717FF8"}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                <>
                  <FaArrowUp />
                  <span>Up-vote: {up_vote_count}</span>
                </>
              )}
            </button>{" "}
            <button
              onClick={() => handleToDownVote(_id)}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Down-vote"
              className={` flex items-center gap-1 p-3 ${
                isDownVote && "text-red-400"
              }`}
            >
              <FaArrowDown />
              <span>Down-vote </span>
            </button>
          </div>
        </article>
      </div>
    </section>
  );
};

AllForumCard.propTypes = {
  forum: PropTypes.object.isRequired,
  handleUpVote: PropTypes.func,
  handleDownVote: PropTypes.func,
  loading: PropTypes.bool,
};

export default AllForumCard;
