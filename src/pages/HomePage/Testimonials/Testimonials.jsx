import Slider from "react-slick";
import usePublicData from "./../../../hooks/usePublicData";
import Review from "./../../../components/unique/Review/Review";
import ErrorElement from "../../../components/shared/ErrorElement/ErrorElement";
import LoadingSpinner from "../../../components/shared/LoadingSpinner/LoadingSpinner";
import SectionHeader from "./../../../components/shared/SectionHeader/SectionHeader";
import Reveal from "./../../../components/shared/Reveal/Reveal";

const Testimonials = () => {
  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = usePublicData(["reviews"], "/reviews");

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 3,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  if (isError) {
    return <ErrorElement errorText={error} />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="container mx-auto px-4 py-6 pb-12 overflow-x-hidden">
      <SectionHeader
        title="Testimonial Section "
        description="Get to know what our customer says"
      />
      <div className="slider-container">
        <Slider {...settings}>
          {reviews?.map((review) => (
            <div key={review._id}>
              <Reveal>
                <Review review={review} />
              </Reveal>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
