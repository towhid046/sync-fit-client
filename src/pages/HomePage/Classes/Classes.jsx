import ClassCard from "../../../components/unique/ClassCard/ClassCard";
import SectionHeader from "./../../../components/shared/SectionHeader/SectionHeader";
import usePublicData from "./../../../hooks/usePublicData";
import LoadingSpinner from "./../../../components/shared/LoadingSpinner/LoadingSpinner";
import ErrorElement from "./../../../components/shared/ErrorElement/ErrorElement";

const Classes = () => {
  const {
    data: classes,
    isLoading,
    error,
    isError,
  } = usePublicData("classes", "/popular-classes");

  if (isError) {
    return <ErrorElement errorText={error} />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="lg:py-16 md:py-12 py-8 container mx-auto px-4">
      <SectionHeader
        title="Discover our Popular classes"
        description="Popular classes base on the users booked class"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {classes?.map((singleClass) => (
          <ClassCard key={singleClass._id} singleClass={singleClass} />
        ))}
      </div>
    </section>
  );
};

export default Classes;
