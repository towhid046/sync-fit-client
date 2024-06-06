import { Link, useLoaderData } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SectionHeader from "./../../components/shared/SectionHeader/SectionHeader";
import packages from "./packagesData";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { FaArrowTrendUp } from "react-icons/fa6";
import ButtonPrimary from "./../../components/shared/ButtonPrimary/ButtonPrimary";
import { useEffect } from "react";
import { scrollToTop } from "./../../utilities/scrollToTop";

const TrainerBookedPage = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  const { selectedSlot, handleUserSelectedPackage } = useAuth();
  const trainer = useLoaderData();

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

  const packageItems = packages.map((pack) => (
    <div
      key={pack.membershipTitle}
      className="p-6 py-10 transition space-y-6 duration-300 bg-custom-secondary shadow-sm"
    >
      <div>
        <h2 className="text-4xl font-bold">{pack.membershipTitle}</h2>
        <p className="text-lg font-bold italic text-custom-primary">
          Price: $ {pack.price}
        </p>
      </div>

      <hr />

      <ul className="list-none flex flex-col gap-2">
        {pack.facilities?.map((facility, index) => (
          <li key={index} className="flex items-center gap-2">
            <IoCheckmarkDoneOutline className="text-custom-primary text-2xl" />
            <span className="text-gray-500">{facility}</span>
          </li>
        ))}
      </ul>

      <hr />

      <Link
        onClick={() => handleUserSelectedPackage(pack)}
        to={`/payment/${_id}`}
      >
        <ButtonPrimary customClass="border-custom-primary flex items-center gap-3 py-2.5 w-full justify-center">
          Join Now
          <FaArrowTrendUp />
        </ButtonPrimary>
      </Link>
    </div>
  ));

  return (
    <section className="container mx-auto px-4 pb-16">
      <SectionHeader
        title={`${name} will be your trainer`}
        description={`You have selected the ${selectedSlot} Slot`}
      />

      <div className="space-y-3 flex flex-col items-center justify-center mt-7 text-center">
        <h2 className="md:text-4xl text-3xl font-bold italic">
          Trainer: {name}
        </h2>
        <div className="space-y-1">
          <p className=" font-semibold text-lg">Your Selected Slot</p>
          <div className="px-5 text-center max-w-max border-custom-primary border-opacity-40 border flex items-center gap-4 py-2.5">
            {selectedSlot}
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {packageItems}
      </div>
    </section>
  );
};

export default TrainerBookedPage;
