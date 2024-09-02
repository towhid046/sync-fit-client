import { useEffect, useState } from "react";
import { scrollToTop } from "../../utilities/scrollToTop";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import LoadingSpinner from "../../components/shared/LoadingSpinner/LoadingSpinner";
import { useLoaderData, useNavigate } from "react-router-dom";
import PageBanner from "../../components/shared/PageBanner/PageBanner";
import AllForumCard from "./AllForumCard/AllForumCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ErrorElement from "./../../components/shared/ErrorElement/ErrorElement";
import swal from "sweetalert";
import useAuth from "./../../hooks/useAuth";
import CustomHelmet from './../../components/shared/CustomHelmet/CustomHelmet';

const AllForums = () => {
  const [forums, setForums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isVoteChange, setIsVoteChange] = useState(true);

  const { user } = useAuth();
  const count = useLoaderData();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  // pagination related variables:
  const [currentPage, setCurrentPage] = useState(1);
  const totalForums = count?.totalForums;
  const perPageForums = 6;
  const totalNumberOfPages = Math.ceil(totalForums / perPageForums);
  const pageNumbers = [...Array(totalNumberOfPages).keys()];

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosPublic.get(
          `/forums?totalPerPage=${perPageForums}&currentPage=${currentPage}`
        );
        setForums(res?.data);
      } catch (error) {
        setIsError(error?.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [currentPage, isVoteChange]);

  const handleGetCurrentPage = (currPage) => {
    setIsLoading(true);
    setCurrentPage(currPage);
    scrollToTop();
  };

  const handlePrevBtn = () => {
    setIsLoading(true);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToTop();
    }
  };

  const handleNextBtn = () => {
    setIsLoading(true);
    if (currentPage < totalNumberOfPages) {
      setCurrentPage(currentPage + 1);
      scrollToTop();
    }
  };

  const handleUpVote = async (id) => {
    let success = false;

    if (user) {
      setLoading(true);
      try {
        const res = await axiosPublic.patch(
          `/modify-forum-up-vote?id=${id}&voteState=${isVoteChange}`
        );
        if (res.data.modifiedCount) {
          setIsVoteChange(!isVoteChange);
          success = true;
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
      return;
    }

    swal({
      title: "Login to vote",
      text: "Want to gives vote, Please Login first!",
      icon: "info",
      buttons: true,
      dangerMode: false,
    }).then((willDelete) => {
      if (willDelete) {
        navigate("/login");
      }
    });

    return success;
  };

  const handleDownVote = async (id) => {
    let successDownVote = false;

    if (user) {
      if (isVoteChange) {
        return;
      }

      setLoading(true);
      try {
        const res = await axiosPublic.patch(
          `/modify-forum-up-vote?id=${id}&voteState=${isVoteChange}&downVote=down`
        );
        if (res.data.modifiedCount) {
          setIsVoteChange(true);
          successDownVote = true;
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
      return;
    }

    swal({
      title: "Login to vote",
      text: "Want to gives vote, Please Login first!",
      icon: "info",
      buttons: true,
      dangerMode: false,
    }).then((willDelete) => {
      if (willDelete) {
        navigate("/login");
      }
    });

    return successDownVote;
  };

  if (isError) {
    return <ErrorElement errorText={isError} />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section>
      <CustomHelmet title={"Community"} />
      <PageBanner title="Community" link="/all-forums" />
      <div className="pt-10 container mx-auto px-4">
        {/* all forums container */}
        <div className="flex flex-col gap-7">
          {forums?.map((forum) => (
            <AllForumCard
              handleUpVote={handleUpVote}
              handleDownVote={handleDownVote}
              key={forum._id}
              forum={forum}
              loading={loading}
            />
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
