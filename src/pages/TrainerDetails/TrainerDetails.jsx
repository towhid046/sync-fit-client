import { Link, useLoaderData } from "react-router-dom";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import { useEffect } from "react";
import { scrollToTop } from "./../../utilities/scrollToTop";
import { CiStar } from "react-icons/ci";
import { FaInstagram, FaLinkedin, FaFacebookF } from "react-icons/fa";
import { CiDumbbell } from "react-icons/ci";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import ButtonPrimary from "../../components/shared/ButtonPrimary/ButtonPrimary";
import { FaArrowTrendUp } from "react-icons/fa6";
import useAuth from "./../../hooks/useAuth";

const TrainerDetails = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  const trainer = useLoaderData();
  const { handleUserSelectedSlot } = useAuth();

  const {
    _id,
    name,
    image,
    yearsOfExperience,
    socialLinks,
    availableSlots,
    biography,
    areaOfExpertise,
    rating,
  } = trainer;

  const socialItems = [
    {
      id: 1,
      icon: <FaFacebookF />,
      link: socialLinks?.facebook,
      animTime: 300,
    },
    {
      id: 2,
      icon: <FaInstagram />,
      link: socialLinks?.instagram,
      animTime: 500,
    },
    { id: 3, icon: <FaLinkedin />, link: socialLinks?.linkedin, animTime: 700 },
  ];

  const allSocialItems = socialItems?.map((item) => (
    <button
      key={item.id}
      className={`p-3 text-white bg-custom-primary bg-opacity-70 hover:bg-opacity-100 duration-500 rounded-full `}
    >
      <Link target="_blank" to={item?.link}>
        <span className=" text-xl">{item?.icon}</span>
      </Link>
    </button>
  ));

  const slotItems = availableSlots?.map((slot) => (
    <Link to={`/trainer-booking/${_id}`} key={slot}>
      <button
        onClick={() => handleUserSelectedSlot(slot)}
        className={`hover:bg-custom-primary py-2 px-4 font-medium text-gray-500 border border-custom-primary border-opacity-40 transition duration-500 hover:bg-opacity-70 hover:text-white `}
        key={slot}
      >
        {slot}
      </button>
    </Link>
  ));

  const expertiseItems = areaOfExpertise?.map((area) => (
    <li key={area} className="flex items-center gap-1">
      <IoCheckmarkDoneOutline className="text-custom-primary text-2xl" />
      <span className="text-gray-500">{area}</span>
    </li>
  ));

  return (
    <section className="mx-auto container px-4">
      <SectionHeader
        title={`Trainer ${name} Details`}
        description={`Around ${yearsOfExperience} years of experiences and his / her average rating is ${rating}`}
      />

      <div className=" mb-16 p-16 pb-9 container mx-auto px-4 bg-custom-secondary shadow-sm max-w-4xl ">
        <div className="flex md:flex-row flex-col items-center justify-center md:gap-12 gap-8">
          <figure className="flex-1 flex justify-center">
            <img
              className="h-60 w-60 rounded-full"
              src={image}
              alt="News Image"
            />
          </figure>

          <div className="flex-1">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold mb-2">{name}</h2>

              <ul className="list-none flex md:items-center md:flex-row flex-col  md:gap-12 gap-2 flex-wrap">
                <li className="flex items-center gap-2">
                  <CiStar className="text-xl text-custom-primary" />
                  <span className="text-gray-400">{rating} Stars</span>
                </li>
                <li className="flex items-center gap-2">
                  <CiDumbbell className="text-xl text-custom-primary -rotate-45" />
                  <span className="text-gray-400">
                    {yearsOfExperience} years of experiences
                  </span>
                </li>
              </ul>

              <ul className="list-none mt-7 space-y-2">{expertiseItems}</ul>
              <ul className="flex list-none gap-3 items-center">
                {allSocialItems}
              </ul>
            </div>
          </div>
        </div>

        <div className=" mt-5 p-6 pb-0 flex md:flex-row flex-col md:items-start items-center justify-center md:gap-12 gap-8">
          <div className="flex-1">
            <p className="text-xl underline  text-custom-primary font-medium mb-2 italic">
              Available Slots:
            </p>
            <ul className="space-y-2  flex flex-col items-start">
              {slotItems}
            </ul>
          </div>

          <div className="flex-1">
            <p className="italic text-gray-600 font-medium">Biography :</p>
            <span className="text-gray-600">{biography}</span>
            {/* become a trainer  */}
            <div className="flex justify-end mt-6">
              <Link to={"/be-a-trainer"}>
                <ButtonPrimary customClass="border-custom-primary flex items-center gap-4 py-2.5">
                  Be A Trainer
                  <FaArrowTrendUp />
                </ButtonPrimary>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainerDetails;