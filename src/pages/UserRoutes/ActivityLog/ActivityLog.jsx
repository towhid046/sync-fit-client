import useSecureData from "./../../../hooks/useSecureData";
import LoadingSpinner from "./../../../components/shared/LoadingSpinner/LoadingSpinner";
import ErrorElement from "./../../../components/shared/ErrorElement/ErrorElement";
import PageBanner from "./../../../components/shared/PageBanner/PageBanner";
import useAuth from "./../../../hooks/useAuth";
import { useEffect } from "react";
import { scrollToTop } from "./../../../utilities/scrollToTop";

const ActivityLog = () => {
  const { user } = useAuth();
  useEffect(() => {
    scrollToTop();
  }, []);
  const {
    data: trainer,
    isLoading,
    isError,
    error,
  } = useSecureData(
    ["newsletterSubscribers"],
    `/applied-trainer-by-email?email=${user?.email}`
  );

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
          <h2 className="text-3xl font-medium pb-3 text-center">
            Your applied information
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
                <td className="py-2 px-4 border-b">{trainer?.name}</td>
                <td className="py-2 px-4 border-b">{trainer?.email}</td>
                <td className="py-2 px-4 border-b text-gray-800">
                  {trainer?.availableSlots?.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </td>
                <td className="py-2 px-4 border-b text-purple-500">
                  {trainer?.status}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ActivityLog;
