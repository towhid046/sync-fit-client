import axios from "axios";

import { useEffect, useState } from "react";
import { scrollToTop } from "../../utilities/scrollToTop";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import LoadingSpinner from "../../components/shared/LoadingSpinner/LoadingSpinner";
import { useLoaderData } from "react-router-dom";
import PageBanner from "../../components/shared/PageBanner/PageBanner";
import AllForumCard from "./AllForumCard/AllForumCard";

const AllForums = () => {
  const [forums, setForums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const count = useLoaderData();

  // pagination related variables:
  const [currentPage, setCurrentPage] = useState(1);
  const totalForums = count?.totalForums;
  const perPageForums = 4;
  const totalNumberOfPages = Math.ceil(totalForums / perPageForums);
  const pageNumbers = [...Array(totalNumberOfPages).keys()];

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/forums?totalPerPage=${perPageForums}&currentPage=${currentPage}`
        );

        setForums(res.data);
      } catch (error) {
        setIsError(error?.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [currentPage]);

  const handleGetCurrentPage = (currPage) => {
    setCurrentPage(currPage);
    scrollToTop();
  };

  const handlePrevBtn = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToTop();
    }
  };

  const handleNextBtn = () => {
    if (currentPage < totalNumberOfPages) {
      setCurrentPage(currentPage + 1);
      scrollToTop();
    }
  };

  if (isError) {
    return (
      <div className="flex justify-center py-12 min-h-[80vh] items-center">
        <h2 className="text-2xl font-bold text-gray-300">{isError}</h2>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section>
      <PageBanner title="Community" link="/all-forums" />
      <div className="pt-10 container mx-auto px-4">

        {/* all forums container */}
        <div className="flex flex-col gap-7">
          {forums?.map((forum) => (
            <AllForumCard key={forum._id} forum={forum} />
          ))}
        </div>


        {/* pagination div */}

        <div className={`flex justify-center items-center py-12`}>
          <button
            onClick={handlePrevBtn}
            disabled={currentPage === 1}
            className={`flex items-center ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-custom-primary cursor-pointer"
            } py-2 gap-4 px-8 mr-4`}
          >
            <FaArrowLeftLong />
            Prev
          </button>
          <ul className={`grid gap-2 grid-cols-1 md:flex`}>
            {pageNumbers?.map((number, index) => (
              <button
                onClick={() => handleGetCurrentPage(index + 1)}
                className={` py-2 px-4 ${
                  currentPage === number + 1
                    ? "bg-custom-primary text-white"
                    : "bg-gray-800 bg-opacity-80 text-white"
                }`}
                key={number}
              >
                {number + 1}
              </button>
            ))}
          </ul>
          <button
            onClick={handleNextBtn}
            disabled={currentPage === totalNumberOfPages}
            className={`flex items-center ${
              currentPage === totalNumberOfPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-custom-primary cursor-pointer"
            } py-2 gap-4 px-8  ml-4`}
          >
            Next
            <FaArrowRightLong />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllForums;
