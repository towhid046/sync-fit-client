import SectionHeader from "./../../../components/shared/SectionHeader/SectionHeader";
import usePublicData from "../../../hooks/usePublicData";
import ErrorElement from "../../../components/shared/ErrorElement/ErrorElement";
import LoadingSpinner from "../../../components/shared/LoadingSpinner/LoadingSpinner";
import TeamMember from "../../../components/unique/TeamMember/TeamMember";

const Team = () => {
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
    return <LoadingSpinner/>;
  }

  return (
    <section className="container mx-auto px-4 lg:py-16 md:py-12 py-8 lg:mb-12 mb-6">
      <SectionHeader
        title="Discover Our Trainers"
        description="Stay Updated with SyncFit"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
        {forums?.slice(0, 3).map((info) => (
          <TeamMember key={info._id} info={info} />
        ))}
      </div>
    </section>
  );
};

export default Team;
