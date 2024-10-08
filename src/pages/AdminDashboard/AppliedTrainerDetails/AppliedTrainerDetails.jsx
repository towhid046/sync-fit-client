import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaInstagram, FaLinkedin, FaFacebookF } from "react-icons/fa";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import ButtonPrimary from "./../../../components/shared/ButtonPrimary/ButtonPrimary";
import SectionHeader from "./../../../components/shared/SectionHeader/SectionHeader";
import { scrollToTop } from "./../../../utilities/scrollToTop";
import { FaXmark } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import swal from "sweetalert";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import LoadingSpinner from "./../../../components/shared/LoadingSpinner/LoadingSpinner";

const AppliedTrainerDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  useEffect(() => {
    scrollToTop();
  }, []);

  const applicant = useLoaderData();

  const {
    _id,
    name,
    image,
    email,
    socialLinks,
    availableSlots,
    biography,
    areaOfExpertise,
  } = applicant;
  const [initialBio, setInitialBio] = useState(
    biography?.split(" ").slice(0, 14).join(" ")
  );

  const handleShowFullBio = () => {
    setInitialBio(biography);
  };

  const handleAcceptApplicant = async (applicant) => {
    const id = applicant._id;

    swal({
      title: "Are you sure?",
      text: "Want to make this applicant as a Trainer!!",
      icon: "info",
      buttons: true,
      dangerMode: false,
    }).then(async (accept) => {
      if (accept) {
        setIsLoading(true);
        try {
          const res = await axiosSecure.post(
            `/accept-applicant/${id}`,
            applicant
          );
          if (res.data.deletedCount) {
            swal(
              "Success",
              `You have successfully Add ${name} as a trainer`,
              "success"
            );
            navigate("/admin-dashboard/applied-trainers");
          }
        } catch (error) {
          console.log(error.message);
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  const handleRejectApplicant = async (data) => {
    try {
      const res = await axiosSecure.patch(
        `/rejected-applicant?email=${email}`,
        data
      );

      if (res?.data?.modifiedCount) {
        swal(
          "Rejection Success",
          "Thanks for giving feedback that help the applicant for father improvement",
          "success"
        );
        navigate("/admin-dashboard/applied-trainers");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      handleToggleModal(false);
    }
  };

  // ----------------------------------------
  // modal related functions:
  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
      <Link target="_blank" to={item.link}>
        <span className=" text-xl">{item.icon}</span>
      </Link>
    </button>
  ));

  const slotItems = availableSlots?.slice(0, 3).map((slot) => (
    <li key={slot} className="flex items-center gap-2">
      <IoCheckmarkDoneOutline className="text-custom-primary text-2xl" />
      <span className="text-gray-500">{slot}</span>
    </li>
  ));

  const expertiseItems = areaOfExpertise.map((area) => (
    <li key={area} className="flex items-center gap-1">
      <IoCheckmarkDoneOutline className="text-custom-primary text-2xl" />
      <span className="text-gray-500">{area}</span>
    </li>
  ));

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="mx-auto container px-4">
      <SectionHeader
        title={`Applicant ${name} Details`}
        description={`See a more about this applicant details`}
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
              <ul className="list-none mt-7 space-y-2">
                <p className="text-xl font-bold text-gray-700">Skills:</p>
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
            <h2 className="text-3xl font-semibold mb-1">{name}</h2>
            <p className="text-gray-700 mb-5">Email: {email}</p>
            <p className="text-lg  text-custom-primary opacity-80 font-medium mb-2 italic">
              Offered Slots:
            </p>
            <ul className="space-y-1">{slotItems}</ul>
          </div>

          <div className="flex-1">
            <p className="italic text-gray-600 font-medium underline">
              Biography :
            </p>
            <p>
              {initialBio}
              <em
                onClick={handleShowFullBio}
                className={`${
                  initialBio.split(" ").length > 14 && "hidden"
                } text-custom-primary cursor-pointer`}
              >
                {" "}
                ...see more
              </em>
            </p>
            {/* Accept or reject an applicant */}
            <div className="flex justify-end gap-4 mt-6">
              <div onClick={handleToggleModal}>
                <ButtonPrimary customClass="border-custom-primary flex items-center gap-2 py-2 bg-red-400 border-red-400 hover:bg-red-500 hover:border-red-500">
                  <FaXmark className="text-lg" />
                  <span>Reject</span>
                </ButtonPrimary>
              </div>

              <div onClick={() => handleAcceptApplicant(applicant)}>
                <ButtonPrimary customClass="border-custom-primary flex items-center gap-2 py-2 bg-green-600 border-green-600 hover:bg-green-700 hover:border-green-700">
                  <IoMdCheckmark className="text-xl" />
                  <span>Accept</span>
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal form for review: */}
      {isModalOpen && (
        <section className="w-full bg-black bg-opacity-60 top-0 min-h-screen fixed flex items-center px-4 left-0 overflow-y-scroll">
          <div className="w-full">
            <div className="bg-custom-secondary  relative max-w-3xl md:p-12 p-6 mx-auto">
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

              <>
                <div className=" mb-5">
                  <div className="flex md:flex-row flex-col items-center justify-center md:gap-12 gap-3">
                    <div className="flex-1">
                      <h2 className="text-3xl font-semibold mb-1">{name}</h2>
                      <p className="text-gray-700 mb-5">Email: {email}</p>
                      <p className="text-lg  text-custom-primary opacity-80 font-medium mb-2 italic">
                        Offered Slots:
                      </p>
                      <ul className="space-y-1">{slotItems}</ul>
                    </div>
                    <div className="flex-1">
                      <div className="space-y-4">
                        <ul className="list-none mt-7 space-y-2">
                          <p className="text-xl font-bold text-gray-700">
                            Skills:
                          </p>
                          {expertiseItems}
                        </ul>
                        <ul className="flex list-none gap-3 items-center">
                          {allSocialItems}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </>

              {/* modal form */}
              <form onSubmit={handleSubmit(handleRejectApplicant)}>
                <div className="mb-4 relative">
                  <textarea
                    className="bg-transparent text-[#4A4E4B] border border-gray-500 block w-full py-2.5 px-5 focus:outline-none placeholder-[#a6a7a6]"
                    placeholder="Write rejection feedback"
                    rows={4}
                    required
                    {...register("feedback")}
                  ></textarea>
                </div>
                <div>
                  <ButtonPrimary customClass="w-full py-3 border-custom-primary mt-5">
                    Submit Feedback
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

export default AppliedTrainerDetails;
