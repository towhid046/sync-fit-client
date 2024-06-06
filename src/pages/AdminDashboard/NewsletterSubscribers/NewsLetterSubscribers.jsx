import SectionHeader from "../../../components/shared/SectionHeader/SectionHeader";
import useSecureData from "./../../../hooks/useSecureData";
import LoadingSpinner from "./../../../components/shared/LoadingSpinner/LoadingSpinner";
import ErrorElement from "./../../../components/shared/ErrorElement/ErrorElement";

const NewsLetterSubscribers = () => {
  const {
    data: newsletterSubscribers,
    isLoading,
    isError,
    error,
  } = useSecureData(["newsletterSubscribers"], "/news-letter-subscribers");
  console.log(newsletterSubscribers);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorElement errorText={error} />;
  }

  return (
    <section className="container mx-auto px-4">
      <SectionHeader
        title={`All Newsletter Subscribers: ${newsletterSubscribers?.length}`}
        description="See all the user who subscriber the newsletter"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="text-center">
              <th className="py-2 px-4 border-b">SN.</th>
              <th className="py-2 px-4 border-b">User Name</th>
              <th className="py-2 px-4 border-b">Email</th>
            </tr>
          </thead>
          <tbody>
            {newsletterSubscribers?.map((subscriber, index) => (
              <tr key={subscriber._id} className={`text-center ${index % 2 !== 1 ? 'bg-custom-secondary-light' : ''}`}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{subscriber?.name}</td>
                <td className="py-2 px-4 border-b">{subscriber?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default NewsLetterSubscribers;
