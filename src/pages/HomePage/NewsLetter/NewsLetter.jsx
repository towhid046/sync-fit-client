import { FaArrowTrendUp } from "react-icons/fa6";
import ButtonPrimary from "../../../components/shared/ButtonPrimary/ButtonPrimary";
import { useForm } from "react-hook-form";
import useAxiosPublic from "./../../../hooks/useAxiosPublic";
import swal from "sweetalert";

const NewsLetter = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const onSubmit = async (data) => {
    try {
      const res = await axiosPublic.post(
        `/news-letter-users/${data.email}`,
        data
      );
      if (res.data.insertedId) {
        swal(
          "Subscribed!",
          "Thank you for subscribe our newsletter.",
          "success"
        );
        reset();
      }
      if (res.data?.message) {
        swal("User Exist", `${res.data.message}.`, "info");
      }
    } catch (error) {
      swal("Error!", `${error.message}`, "error");
    }
  };

  return (
    <section className="container lg:py-16 md:py-12 py-8 px-4">
      <div className=" flex md:flex-row flex-col md:gap-12 gap-5 bg-custom-secondary shadow-xl  justify-between  mx-auto lg:p-16 md:p-12 p-8 max-w-4xl items-center">
        <div className="flex-1">
          <h2 className="md:text-4xl text-3xl font-bold uppercase">
            Subscribe to Our Newsletter!!
          </h2>
          <p className="text-gray-400 mt-4">
            Subscribe our news letter to get exciting latest and updated news.
            So you stay connected to our forums .
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="md:flex-1 w-full">
          <label className="font-bold text-gray-800 text-[14px] md:text-[16px] block mb-[5px]">
            Your Name
          </label>
          <input
            {...register("name")}
            type="text"
            required
            placeholder="Your Name"
            className="bg-transparent text-[#4A4E4B] border border-gray-500 block w-full py-3 px-5 focus:outline-none placeholder-[#4A4E4B] mb-4"
          />

          <label className="font-bold text-gray-800 text-[14px] md:text-[16px] block mb-1">
            Your Email
          </label>
          <input
            {...register("email")}
            type="email"
            required
            placeholder="Your Email"
            className="bg-transparent text-[#4A4E4B] border border-gray-500 block w-full py-3 px-5 focus:outline-none placeholder-[#4A4E4B] mb-5"
          />
          <ButtonPrimary customClass="border-custom-primary flex items-center gap-4">
            Subscribe Now
            <FaArrowTrendUp />
          </ButtonPrimary>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
