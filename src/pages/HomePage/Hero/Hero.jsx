import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { Link } from "react-router-dom";
import slides from "./slideData.js";
import { Slide } from "react-awesome-reveal";
import ButtonPrimary from "./../../../components/shared/ButtonPrimary/ButtonPrimary";

const Hero = () => {
  const sliderRef = useRef(null);

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings = {
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 800,
    autoplaySpeed: 5000,
  };

  return (
    <section className="relative overflow-x-hidden">
      <button
        onClick={handlePrev}
        className="bg-custom-secondary bg-opacity-20 p-3 rounded-full text-custom-secondary  transition duration-300 hover:bg-gray-800 hover:bg-opacity-80  left-4 lg:left-6 z-40 top-[40%] absolute"
      >
        <MdOutlineKeyboardArrowLeft className=" text-2xl" />
      </button>

      <Slider className="mx-auto" ref={sliderRef} {...settings} autoplay={true}>
        {slides?.map((slide) => (
          <div key={slide.id}>
            <div
              style={{ backgroundImage: `url(${slide.img})` }}
              className=" p-5 bg-cover bg-center bg-no-repeat relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="relative z-10 flex flex-col justify-center items-center text-white">
                <div className="max-w-3xl mx-auto px-5 md:py-20 py-16 lg:py-36 rounded-lg">
                  <Slide direction="up">
                    <h2 className="font-bold lg:text-5xl text-4xl md:mb-4 mb-2">
                      {slide.title}
                    </h2>
                    <p className="text-md mb-5">{slide.description}</p>

                    <Link to="/all-classes">
                      <ButtonPrimary customClass="bg-transparent">
                        Classes
                      </ButtonPrimary>
                    </Link>
                  </Slide>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <button
        onClick={handleNext}
        className="bg-custom-secondary bg-opacity-20 p-3 rounded-full text-custom-secondary  transition duration-300 hover:bg-gray-800 hover:bg-opacity-80  absolute right-4 lg:right-6 z-40 top-[40%]"
      >
        <MdOutlineKeyboardArrowRight className="text-2xl " />
      </button>
    </section>
  );
};

export default Hero;
