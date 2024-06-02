import ForumCard from "../../../components/unique/ForumCard/ForumCard";
import SectionHeader from "./../../../components/shared/SectionHeader/SectionHeader";
import usePublicData from "../../../hooks/usePublicData";
import ErrorElement from "../../../components/shared/ErrorElement/ErrorElement";
import LoadingSpinner from "../../../components/shared/LoadingSpinner/LoadingSpinner";

const Forums = () => {
  const {
    data: forums,
    isLoading,
    isError,
    error,
  } = usePublicData(["forums"], "/forums");

  if (isError) {
    return <ErrorElement errorText={error} />;
  }
  if (isLoading) {
    return <LoadingSpinner customClass="min-h-[80vh]" />;
  }

  return (
    <section className="container mx-auto px-4 lg:py-16 md:py-12 py-8">
      <SectionHeader
        title="Discover Our Latest News"
        description="Stay Updated with SyncFit"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
        {forums?.slice(0, 6).map((info) => (
          <ForumCard key={info._id} info={info} />
        ))}
      </div>
      {/* <Slide direction='up'> 
 <div className="flex justify-center my-7">
        <Link to={"/all-news"}>
          <button className="rounded-full md:px-12 px-5 btn btn-outline btn-error ">
            View All News
            <BsArrowRight className="text-xl" />
          </button>
        </Link>
      </div> 
 </Slide> */}
    </section>
  );
};

export default Forums;
