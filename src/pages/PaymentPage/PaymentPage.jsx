import { useLoaderData } from "react-router-dom";
import ButtonPrimary from "../../components/shared/ButtonPrimary/ButtonPrimary";
import PageBanner from "../../components/shared/PageBanner/PageBanner";
import { useForm } from "react-hook-form";
import useAuth from "./../../hooks/useAuth";
import { useEffect } from "react";
import swal from "sweetalert";
import { scrollToTop } from "../../utilities/scrollToTop";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const PaymentPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const { selectedSlot, selectedPackage, user } = useAuth();
  const trainer = useLoaderData();
  useEffect(() => {
    scrollToTop();
  }, []);

  const {
    _id,
    name: trainerName,
    image,
    yearsOfExperience,
    socialLinks,
    availableSlots,
    biography,
    areaOfExpertise,
    rating,
  } = trainer;

  const formInfo = [
    {
      id: 1,
      title: "Trainer Name",
      name: "trainerName",
      defValue: trainerName,
    },
    {
      id: 2,
      title: "Your Slot",
      name: "slotName",
      defValue: selectedSlot,
    },
    {
      id: 3,
      title: "Your Package Name",
      name: "packageName",
      defValue: selectedPackage?.membershipTitle,
    },
    {
      id: 4,
      title: "Price",
      name: "price",
      defValue: `${selectedPackage?.price}`,
    },
    {
      id: 5,
      title: "Your Name",
      name: "userName",
      defValue: user?.displayName,
    },
    {
      id: 6,
      title: "Your Email",
      name: "userEmail",
      defValue: user?.email,
    },
  ];

  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    try {
      const res = await axiosPublic.post("/booking-package", data);
      if (res.data?.insertedId) {
        swal("Success", "You have successfully booked this package", "success");
        reset();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <section className="min-h-screen">
      <PageBanner title="Payment" link={`/payment/${_id}`} />
      <div className="container mx-auto px-4 md:py-16 py-12">
        <div className="bg-custom-secondary max-w-3xl md:p-12 p-6 mx-auto shadow-sm ">
          <h2 className="md:text-5xl font-bold text-4xl mb-5">
            Payment with your account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 gap-6 grid-cols-1">
              {formInfo.map((item) => (
                <div key={item.id} className="relative">
                  <label className="font-bold text-gray-800 text-[14px] md:text-[16px] block mb-1">
                    {item.title}
                  </label>
                  <input
                    {...register(item.name)}
                    className="bg-transparent text-[#4A4E4B] border border-gray-500 block w-full py-3 px-5 focus:outline-none placeholder-[#4A4E4B]"
                    required
                    readOnly
                    defaultValue={item.defValue}
                    type={"text"}
                  />
                </div>
              ))}
            </div>
            <ButtonPrimary customClass="w-full py-3 border-custom-primary mt-5">
              Confirm
            </ButtonPrimary>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;
