import axios from "axios";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import { useEffect, useState } from "react";
import { scrollToTop } from "../../utilities/scrollToTop";
// import ServiceCard from "../../components/unique/ServiceCard/ServiceCard";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import LoadingSpinner from "../../components/shared/LoadingSpinner/LoadingSpinner";
import AllClassCard from "./AllClassCard/AllClassCard";
import { useLoaderData } from "react-router-dom";
const ClassesPage = () => {
  const [searchText, setSearchText] = useState("");
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const count = useLoaderData();

  // pagination related variables:
  const [currentPage, setCurrentPage] = useState(1);
  const totalClasses = count?.totalClasses;
  const perPageClasses = 2;
  const totalNumberOfPages = Math.ceil(totalClasses / perPageClasses);
  const pageNumbers = [...Array(totalNumberOfPages).keys()];

  // const {
  //   data: classes,
  //   isLoading,
  //   error,
  //   isError,
  // } = usePublicData(["classes"], `/classes?totalPerPage=${perPageClasses}&currentPage=${currentPage}`);

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/classes?totalPerPage=${perPageClasses}&currentPage=${currentPage}`
        );

        setClasses(res.data);
      } catch (error) {
        setIsError(error?.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [currentPage]);

  // const handleSearchService = (e) => {
  //   e.preventDefault();
  //   const value = e.target.search.value;
  //   setSearchText(value);
  // };

  // const handleSearchOnChange = (e) => {
  //   const searchVal = e.target.value;
  //   setSearchText(searchVal);
  // };

  const handleGetCurrentPage = (currPage) => {
    setCurrentPage(currPage);
    // setSearchText("");
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
    <section className="py-8 md:py-12 lg:py-16 container mx-auto px-4">
      <SectionHeader
        title="Explore All Classes"
        description="Explore all our classes"
      />
      {/* <div className="mb-10">
        <form onSubmit={handleSearchService} className="w-full">
          <label className="input input-bordered rounded-full max-w-md flex mx-auto items-center gap-2">
            <input
              onChange={handleSearchOnChange}
              type="text"
              name="search"
              className="grow"
              placeholder="Search by service name"
            />
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-5 h-5 opacity-70 cursor-pointer"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </label>
        </form>
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {classes?.map((singleClass, index) => (
          <AllClassCard
            key={singleClass._id}
            singleClass={singleClass}
            index={index}
          />
        ))}
      </div>

      {classes.length <= 0 && (
        <h2 className="text-2xl font-semibold italic text-gray-300 py-10 text-center">
          Sorry, No service have match in your search!
        </h2>
      )}

      <div
        className={`flex justify-center items-center py-8 ${
          searchText && "hidden"
        }`}
      >
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
    </section>
  );
};

export default ClassesPage;
