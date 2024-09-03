import ForumCard from "../../../components/unique/ForumCard/ForumCard";
import SectionHeader from "./../../../components/shared/SectionHeader/SectionHeader";
import usePublicData from "../../../hooks/usePublicData";
import ErrorElement from "../../../components/shared/ErrorElement/ErrorElement";
import LoadingSpinner from "../../../components/shared/LoadingSpinner/LoadingSpinner";
import ButtonPrimary from "../../../components/shared/ButtonPrimary/ButtonPrimary";
import { Link } from "react-router-dom";
import { FaArrowTrendUp } from "react-icons/fa6";
import Reveal from "../../../components/shared/Reveal/Reveal";

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
    <section className="bg-custom-secondary">
      <div className="container mx-auto px-4 py-6">
        <SectionHeader
          title="Discover Our Latest News"
          description="Stay Updated with SyncFit"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
          {news?.slice(0, 6).map((info) => (
            <ForumCard key={info._id} info={info} />
          ))}
        </div>
        <Reveal>
          <div className="mt-10 flex justify-center">
            <Link to={"/all-forums"}>
              <ButtonPrimary customClass="border-custom-primary flex items-center gap-4 py-2.5 border-opacity-30 md:px-7 ">
                See more blogs
                <FaArrowTrendUp />
              </ButtonPrimary>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Forums;
