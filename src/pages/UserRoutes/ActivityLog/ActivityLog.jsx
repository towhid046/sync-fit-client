import useSecureData from "./../../../hooks/useSecureData";
import LoadingSpinner from "./../../../components/shared/LoadingSpinner/LoadingSpinner";
import ErrorElement from "./../../../components/shared/ErrorElement/ErrorElement";
import PageBanner from "./../../../components/shared/PageBanner/PageBanner";
import useAuth from "./../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { scrollToTop } from "./../../../utilities/scrollToTop";
import { FaEye } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const ActivityLog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuth();
  useEffect(() => {
    scrollToTop();
  }, []);
  const {
    data: applicant,
    isLoading,
    isError,
    error,
  } = useSecureData(
    ["applied-trainer"],
    `/applied-trainer-by-email?email=${user?.email}`
  );

  // ---------------------------------------------
  // modal related functions:
  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (isLoading) {
    return <LoadingSpinner customClass={"min-h-[90vh]"} />;
  }

  if (isError) {
    return <ErrorElement errorText={error} />;
  }

  return (
    <section>
      <PageBanner title={`Activity log`} link="activity" />
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="overflow-x-auto">
        <h2 className="md:text-4xl text-center font-bold text-3xl mb-5">
            Your Applied Information
          </h2>
          <table className="min-w-full bg-white bg-opacity-80 border border-gray-200">
            <thead>
              <tr className="text-center">
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Added Slots</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className={`text-center bg-custom-secondary-light`}>
                <td className="py-2 px-4 border-b">{applicant?.name}</td>
                <td className="py-2 px-4 border-b">{applicant?.email}</td>
                <td className="py-2 px-4 border-b text-gray-800">
                  {applicant?.availableSlots?.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </td>
                <td
                  className={`py-2 px-4 flex  justify-center gap-2 border-b italic
                ${applicant?.status === "Pending" && "text-purple-500"}
                ${applicant?.status === "Rejected" && "text-red-500"}
                `}
                >
                  <p>{applicant?.status}</p>
                  <span>
                    {applicant?.status === "Rejected" && (
                      <button onClick={handleToggleModal}>
                        <FaEye className="text-2xl text-gray-800 transaction duration-300 hover:text-custom-primary" />
                      </button>
                    )}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal form for review: */}
      {isModalOpen && (
        <section className="w-full bg-black bg-opacity-60 top-0 min-h-screen fixed flex items-center px-4">
          <div className="w-full">
            <div className="bg-custom-secondary  relative max-w-xl md:p-8 p-6 mx-auto ">
              <div className="absolute right-6 top-6 ">
                <button
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Close"
                  onClick={handleToggleModal}
                  className="border-opacity-20 border p-2 border-custom-primary hover:border-opacity-40  transition duration-300"
                >
                  <FaTimes className="text-gray-700 text-2xl hover:text-custom-primary" />
                </button>
              </div>
              <h2 className="text-center text-2xl font-semibold mt-5 mb-3">
                Admin Feedback
              </h2>
              <p className="text-gray-600 italic mb-4">
                {applicant?.adminFeedback}
              </p>
              <div>
                <button
                  onClick={handleToggleModal}
                  className="border-opacity-20 border px-5 py-2 bg-gray-800 bg-opacity-80 text-white hover:bg-gray-800 hover:border-opacity-40  transition duration-300"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default ActivityLog;
