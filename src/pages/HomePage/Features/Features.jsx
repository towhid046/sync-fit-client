import SectionHeader from "./../../../components/shared/SectionHeader/SectionHeader";
import featuresData from "./featuresData";
const Features = () => {
  const items = featuresData.map((item) => (
    <div
      key={item.id}
      className="
      hover:-translate-y-2
      transition duration-500
      space-y-7 p-6 bg-custom-secondary shadow-sm"
    >
      <figure>
        <img src={item.img} alt="" />
      </figure>
      <div className="space-y-3">
        <h3 className="lg:text-3xl text-2xl font-semibold">{item.title}</h3>
        <p className="text-gray-600">{item.description}</p>
      </div>
    </div>
  ));

  return (
    <section className="container mx-auto px-4 lg:my-16 md:my-12 my-8">
      <SectionHeader
        title="Fitness Programmes at SyncFit"
        description="If you want to be fit, you need to start Today!"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
        {items}
      </div>
    </section>
  );
};

export default Features;
