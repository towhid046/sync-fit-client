import ClassCard from "../../../components/unique/ClassCard/ClassCard";
import SectionHeader from "./../../../components/shared/SectionHeader/SectionHeader";
import usePublicData from "./../../../hooks/usePublicData";
import LoadingSpinner from "./../../../components/shared/LoadingSpinner/LoadingSpinner";
import ErrorElement from "./../../../components/shared/ErrorElement/ErrorElement";
import ButtonPrimary from "./../../../components/shared/ButtonPrimary/ButtonPrimary";
import { Link } from "react-router-dom";
import { FaArrowTrendUp } from "react-icons/fa6";
import { Slide } from "react-awesome-reveal";
import Reveal from "../../../components/shared/Reveal/Reveal";

const Classes = () => {
  const {
    data: classes,
    isLoading,
    error,
    isError,
  } = usePublicData(["classes"], "/popular-classes");

  if (isError) {
    return <ErrorElement errorText={error} />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="bg-custom-secondary">
      <div className="py-6 container mx-auto px-4">
        <SectionHeader
          title="Discover our Popular classes"
          description="Popular classes base on the users booked class"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {classes?.map((singleClass) => (
              <ClassCard key={singleClass._id} singleClass={singleClass} />
          ))}
        </div>

        <Reveal Reveal>
          <div className="mt-10 flex justify-center">
            <Link to={"/all-classes"}>
              <ButtonPrimary customClass="border-custom-primary flex items-center gap-4 py-2.5 border-opacity-30 md:px-7 ">
                See more classes
                <FaArrowTrendUp />
              </ButtonPrimary>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Classes;
