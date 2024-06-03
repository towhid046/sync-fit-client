import { useLoaderData } from "react-router-dom";
import ButtonPrimary from "../../components/shared/ButtonPrimary/ButtonPrimary";
import PageBanner from "../../components/shared/PageBanner/PageBanner";
import { useForm } from "react-hook-form";
import useAuth from "./../../hooks/useAuth";
import { useEffect } from "react";
import swal from "sweetalert";
import { scrollToTop } from "../../utilities/scrollToTop";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Select from "react-select";

const BeATrainer = () => {
  const { register, handleSubmit, reset } = useForm();
  const { selectedSlot, selectedPackage, user } = useAuth();
  //   const trainer = useLoaderData();

  useEffect(() => {
    scrollToTop();
  }, []);

  //   const {
  //     _id,
  //     name: trainerName,
  //     image,
  //     yearsOfExperience,
  //     socialLinks,
  //     availableSlots,
  //     biography,
  //     areaOfExpertise,
  //     rating,
  //   } = trainer;

  const checkboxOptions = [
    {
      id: 1,
      title: "Body building",
    },
    {
      id: 2,
      title: "Cardio strength",
    },
    {
      id: 3,
      title: "Weight lifting",
    },
    {
      id: 4,
      title: "Total body",
    },
    {
      id: 5,
      title: "Jogging & running",
    },
    {
      id: 6,
      title: "Yoga & meditation",
    },
  ];

  const formInfo = [
    {
      id: 1,
      title: "Full Name",
      name: "trainerName",
      //   defValue: trainerName,
    },
    {
      id: 2,
      title: "Your Email",
      name: "slotName",
      type: "email",
      defValue: user?.email,
      readOnly: true,
    },
    {
      id: 3,
      title: "Your Age",
      name: "age",
      type: "number",
    },

    {
      id: 4,
      title: "Profile Image",
      name: "image",
      type: "file",
    },
  ];

  const options = [
    { value: "Monday", label: "Mon" },
    { value: "Tuesday", label: "Tue" },
    { value: "Wednesday", label: "Wed" },
    { value: "Thursday", label: "Thu" },
    { value: "Friday", label: "Fri" },
    { value: "Saturday", label: "Sat" },
    { value: "Sunday", label: "Sun" },
  ];

  const options2 = [
    { value: "9:00 AM - 11:00 AM", label: "9 AM - 11 AM" },
    { value: "11:00 AM - 1:00 PM", label: "11 AM - 1 PM" },
    { value: "1:00 PM - 3:00 PM", label: "1 PM - 3 PM" },
    { value: "3:00 PM - 5:00 PM", label: "3 PM - 5 PM" },
    { value: "5:00 PM - 7:00 PM", label: "5 PM - 7 PM" },
    { value: "7:00 PM - 9:00 PM", label: "7 PM - 9 PM" },
    { value: "9:00 PM - 11:00 PM", label: "9 PM - 11 PM" },
  ];

  // const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    console.log(data);
    // try {
    //   const res = await axiosPublic.post("/booking-package", data);
    //   if (res.data?.insertedId) {
    //     swal("Success", "You have successfully booked this package", "success");
    //     reset();
    //   }
    // } catch (error) {
    //   console.error(error.message);
    // }
  };

  const checkboxItems = checkboxOptions.map((option) => (
    <div key={option.id} className="-mt-5">
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="bg-transparent text-[#4A4E4B] border border-gray-500 rounded focus:ring-0 focus:outline-none mr-2 p-2"
        />
        <span className="text-[#4A4E4B]">{option.title}</span>
      </label>
    </div>
  ));

  const handleGetTime = (val) => {
    // console.log(val);
    const times = [];
    val.forEach((v) => {
      times.push(v.value);
    });
    console.log(times);
  };

  const handleGetDays = (val) => {
    // console.log(val);
    const days = [];
    val.forEach((v) => {
      days.push(v.value);
    });
    console.log(days);
  };

  return (
    <section className="min-h-screen">
      <PageBanner title="Be A Trainer" link={`/be-a-trainer`} />
      <div className="container mx-auto px-4 md:py-16 py-12">
        <div className="bg-custom-secondary max-w-3xl md:p-12 p-6 mx-auto shadow-sm ">
          <h2 className="md:text-5xl font-bold text-4xl mb-5">
            Become A Trainer
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
                    className={`bg-transparent text-[#4A4E4B] border border-gray-500 block w-full ${
                      item.type === "file" ? "py-2" : "py-2.5"
                    } px-5 focus:outline-none placeholder-[#4A4E4B]`}
                    required
                    readOnly={item.readOnly || false}
                    type={item.type || "text"}
                    placeholder={item.title}
                    defaultValue={item.defValue || ""}
                  />
                </div>
              ))}

              {/* select skills */}
              <div className="md:col-span-2">
                <label className="font-bold text-gray-800 text-[14px] md:text-[16px] block ">
                  Skills
                </label>
              </div>

              {checkboxItems}

              {/* Select days */}
              <div className="">
                <label className="font-bold text-gray-800 text-[14px] md:text-[16px] block mb-1">
                  Available Days in Week
                </label>
                <Select
                  onChange={handleGetDays}
                  isMulti
                  name="colors"
                  options={options}
                  className="basic-multi-select w-full"
                />
              </div>

              <div className="">
                <label className="font-bold text-gray-800 text-[14px] md:text-[16px] block mb-1">
                  Available Time in A Day
                </label>
                <Select
                  onChange={handleGetTime}
                  isMulti
                  name="colors"
                  options={options2}
                  className="basic-multi-select w-full"
                />
              </div>
            </div>
            <ButtonPrimary customClass="w-full py-2.5 border-custom-primary mt-5">
              Applied
            </ButtonPrimary>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BeATrainer;
