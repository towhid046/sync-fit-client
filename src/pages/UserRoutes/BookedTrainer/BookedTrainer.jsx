import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaInstagram, FaLinkedin, FaFacebookF } from "react-icons/fa";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { FaArrowTrendUp } from "react-icons/fa6";
import useAuth from "./../../../hooks/useAuth";
import ButtonPrimary from "./../../../components/shared/ButtonPrimary/ButtonPrimary";
import { scrollToTop } from "./../../../utilities/scrollToTop";
import useSecureData from "./../../../hooks/useSecureData";
import LoadingSpinner from "./../../../components/shared/LoadingSpinner/LoadingSpinner";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import PageBanner from "./../../../components/shared/PageBanner/PageBanner";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BookedTrainer = () => {
  const [trainer, setTrainer] = useState({});
  const [rate, setRate] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    scrollToTop();
  }, []);

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data: bookedPackage, isLoading } = useSecureData(
    ["booked-package"],
    `/booked-package-by-email?email=${user?.email}`
  );
  const [loading, setLoading] = useState(isLoading);
  useEffect(() => {
    const loadTrainer = async () => {
      try {
        const res = await axiosPublic.get(
          `/trainer-by-email?email=${bookedPackage?.trainerEmail}`
        );
        setTrainer(res.data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadTrainer();
  }, [bookedPackage, axiosPublic]);

  const {
    _id,
    name,
    image,
    yearsOfExperience,
    socialLinks,
    availableSlots,
    biography,
    areaOfExpertise,
    rating: ratingCount,
    email,
    classes,
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

  // -----------------------------------
  // review modal related functions:

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleRating = (value) => {
    setRate(value);
  };

  const onSubmit = async (data) => {
    const author = {
      name: user?.displayName,
      image: user?.photoURL,
    };
    try {
      const review = {
        ...data,
        rating: rate,
        trainerName: name,
        trainerId: _id,
        author,
      };

      const res = await axiosSecure.post("/reviews", review);
      console.log(res.data);
      
    } catch (error) {
      console.error(error.message);
    }
    handleToggleModal();
  };
  // ------------------------------------

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

  const classItems = classes?.map((item) => (
    <li key={item} className="text-gray-600">
      {item}
    </li>
  ));

  const expertiseItems = areaOfExpertise?.map((area) => (
    <li key={area} className="flex items-center gap-1">
      <IoCheckmarkDoneOutline className="text-custom-primary text-2xl" />
      <span className="text-gray-500">{area}</span>
    </li>
  ));

  if (isLoading || loading) {
    return <LoadingSpinner />;
  }

  return (
    <section>
      <PageBanner title={`Your Trainer`} link="/booked-trainer" />

      <div className="mx-auto container px-4 mt-10">
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
                <h2 className="text-3xl font-semibold ">{name}</h2>
                <p className="text-gray-600">Email: {email}</p>

                <ul className="list-none mt-7 space-y-2">
                  <p className="text-lg text-gray-700 font-semibold  italic">
                    Skills
                  </p>
                  {expertiseItems}
                </ul>
                <ul className="flex list-none gap-3 items-center">
                  {allSocialItems}
                </ul>
              </div>
            </div>
          </div>

          <div className=" mt-5 p-6 pb-0 flex md:flex-row flex-col md:items-start items-center justify-center md:gap-12 gap-8">
            <div className="flex-1">
              <p className="text-xl underline  text-custom-primary font-medium mb-2 italic">
                Offered Classes:
              </p>
              <ul className="space-y-2 list-decimal list-inside flex flex-col items-start">
                {classItems}
              </ul>
            </div>

            <div className="flex-1">
              <p className="italic text-gray-600 font-medium">Biography :</p>
              <span className="text-gray-600">{biography}</span>
            </div>
          </div>

          <div className="px-5  flex lg:justify-between items-center justify-center flex-col lg:flex-row gap-2 mt-6">
            <div>
              <button className="bg-gray-800 text-white bg-opacity-85 border-opacity-30 border py-2.5 px-6 cursor-default">
                Your <em>Booked Slot :</em>{" "}
                <span>{bookedPackage?.slotName}</span>
              </button>
            </div>
            <div onClick={handleToggleModal}>
              <ButtonPrimary customClass="border-custom-primary flex items-center gap-4 py-2.5">
                Write a Review
                <FaArrowTrendUp />
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>

      {/* Modal form for review: */}
      {isModalOpen && (
        <section className="w-full bg-black bg-opacity-60 top-0 min-h-screen fixed flex items-center px-4">
          <div className="w-full">
            <div className="bg-custom-secondary  relative max-w-xl md:p-12 p-6 mx-auto ">
              <div className="absolute right-6 top-6">
                <button
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Close"
                  onClick={handleToggleModal}
                  className="border-opacity-20 border p-2 border-custom-primary hover:border-opacity-40  transition duration-300"
                >
                  <FaTimes className="text-gray-700 text-2xl hover:text-custom-primary" />
                </button>
              </div>
              <h2 className="text-center text-2xl font-semibold mt-5">
                Rating: <span>{rate}</span>
              </h2>

              <div className="flex justify-center mb-10">
                <Rating
                  style={{ maxWidth: 150 }}
                  value={rate}
                  onChange={handleRating}
                  isRequired
                />
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 relative">
                  <textarea
                    className="bg-transparent text-[#4A4E4B] border border-gray-500 block w-full py-2.5 px-5 focus:outline-none placeholder-[#a6a7a6]"
                    placeholder="Description"
                    rows={4}
                    required
                    {...register("description")}
                  ></textarea>
                </div>
                <div>
                  <ButtonPrimary customClass="w-full py-3 border-custom-primary mt-5">
                    Submit
                  </ButtonPrimary>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default BookedTrainer;
