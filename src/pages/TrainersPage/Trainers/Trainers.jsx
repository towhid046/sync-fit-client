import SectionHeader from "./../../../components/shared/SectionHeader/SectionHeader";
import usePublicData from "./../../../hooks/usePublicData";
import LoadingSpinner from "./../../../components/shared/LoadingSpinner/LoadingSpinner";
import ErrorElement from "./../../../components/shared/ErrorElement/ErrorElement";
import Trainer from "../../../components/unique/Trainer/Trainer";
import { useEffect } from "react";
import { scrollToTop } from "./../../../utilities/scrollToTop";
import PageBanner from "../../../components/shared/PageBanner/PageBanner";
import Reveal from "../../../components/shared/Reveal/Reveal";

const Trainers = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  const {
    data: trainers,
    isLoading,
    error,
    isError,
  } = usePublicData(["trainers"], "/trainers");

  if (isError) {
    return <ErrorElement errorText={error} />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section>
      <PageBanner title="All Trainers" link="/all-trainers" />
      <div className="lg:py-16 md:py-12 py-8 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {trainers?.map((trainer) => (
            <Reveal key={trainer._id}>
              <Trainer trainer={trainer} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;
