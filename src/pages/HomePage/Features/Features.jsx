import usePublicData from "../../../hooks/usePublicData";
import SectionHeader from "./../../../components/shared/SectionHeader/SectionHeader";
import ErrorElement from "./../../../components/shared/ErrorElement/ErrorElement";
import LoadingSpinner from "./../../../components/shared/LoadingSpinner/LoadingSpinner";
const Features = () => {
  const {
    data: features,
    isLoading,
    isError,
    error,
  } = usePublicData(["features"], "/features");

  const items = features?.map((item) => (
    <div
      key={item._id}
      className="
      hover:shadow-lg
      transition duration-300
      space-y-7 p-6 bg-custom-secondary shadow-sm "
    >
      <figure>
        <img src={item.img} alt="" />
      </figure>
      <div className="space-y-3">
        <h3 className="lg:text-3xl text-2xl font-semibold">{item.title}</h3>
        <p className="text-gray-600 text-justify">{item.description}</p>
      </div>
    </div>
  ));

  if (isError) {
    return <ErrorElement errorText={error} />;
  }
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="bg-custom-secondary">
      <div className="container mx-auto px-4 lg:py-16 md:py-12 py-8">
        <SectionHeader
          title="Fitness Programmes at SyncFit"
          description="If you want to be fit, you need to start Today!"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items}
        </div>
      </div>
    </section>
  );
};

export default Features;
