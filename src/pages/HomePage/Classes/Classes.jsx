import ClassCard from "../../../components/unique/ClassCard/ClassCard";
import SectionHeader from "./../../../components/shared/SectionHeader/SectionHeader";
import classes from "./classesData";
console.log(classes)

const Classes = () => {
  return (
    <section className="lg:py-16 md:py-12 py-8 container mx-auto px-4">
      <SectionHeader
        title="Discover our Popular classes"
        description="Popular classes base on the users booked class"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {classes.map((singleClass) => (
          <ClassCard key={singleClass.id} singleClass={singleClass} />
        ))}
      </div>
    </section>
  );
};

export default Classes;
