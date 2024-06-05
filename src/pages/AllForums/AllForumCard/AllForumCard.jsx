import { Link } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";
import { useEffect } from "react";

import { FaArrowUp, FaArrowDown } from "react-icons/fa6";

import PropTypes from "prop-types";
import { scrollToTop } from "../../../utilities/scrollToTop";
import useAxiosPublic from './../../../hooks/useAxiosPublic';

const AllForumCard = ({ forum }) => {
  const axiosPublic = useAxiosPublic()

  useEffect(() => {
    // scrollToTop();
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


  const handleUpVote = async(id)=>{
    try {
      const res = await axiosPublic.patch(`/modify-forum-up-vote?id=${id}` )
      console.log(res.data.modifiedCount)
    } catch (error) {
      console.error(error.message)
      
    }
  }

  const handleDownVote = async(id)=>{
    try {
      const res = await axiosPublic.patch(`/modify-forum-up-vote?id=${id}` )
      console.log(res.data.modifiedCount)
    } catch (error) {
      console.error(error.message)
      
    }
  }

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
              <p>{description}</p>
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
          <div className="flex items-center border max-w-max m-4 bg-gray-800 bg-opacity-70 text-white">
            <button
            onClick={()=>handleUpVote(_id)}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Up-vote"
              className="flex items-center gap-1 border-r p-3"
            >
              <FaArrowUp />
              <span>Up-vote: {up_vote_count}</span>
            </button>{" "}
            <button
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Down-vote"
              className="flex items-center gap-1 p-3"
            >
              <FaArrowDown />
              <span>Down-vote: {down_vote_count} </span>
            </button>
          </div>
        </article>
      </div>
    </section>
  );
};

AllForumCard.propTypes = {
  forum: PropTypes.object.isRequired,
};

export default AllForumCard;
