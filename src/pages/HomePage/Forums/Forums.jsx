import ForumCard from "../../../components/unique/ForumCard/ForumCard";
import SectionHeader from "./../../../components/shared/SectionHeader/SectionHeader";
import usePublicData from "../../../hooks/usePublicData";
import ErrorElement from "../../../components/shared/ErrorElement/ErrorElement";
import LoadingSpinner from "../../../components/shared/LoadingSpinner/LoadingSpinner";

const Forums = () => {
  const {
    data: news,
    isLoading,
    isError,
    error,
  } = usePublicData(["news"], "/news");

  if (isError) {
    return <ErrorElement errorText={error} />;
  }
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="container mx-auto px-4 lg:py-16 md:py-12 py-8">
      <SectionHeader
        title="Discover Our Latest News"
        description="Stay Updated with SyncFit"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
        {news?.slice(0, 6).map((info) => (
          <ForumCard key={info._id} info={info} />
        ))}
      </div>
    </section>
  );
};

export default Forums;
