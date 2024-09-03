import ButtonPrimary from "../../components/shared/ButtonPrimary/ButtonPrimary";
import PageBanner from "../../components/shared/PageBanner/PageBanner";
import { useForm } from "react-hook-form";
import useAuth from "./../../hooks/useAuth";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { scrollToTop } from "../../utilities/scrollToTop";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Select from "react-select";
import LoadingSpinner from "./../../components/shared/LoadingSpinner/LoadingSpinner";
import slotData from "./../TrainerDashboard/AddNewSlot/slotData";
import saveUserInfo from "./../../utilities/saveUserInfo";

const imgbb_api_key = import.meta.env.VITE_IMGBB_API_KEY;
const imgbb_api_url = `https://api.imgbb.com/1/upload?key=${imgbb_api_key}`;

const BeATrainer = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    scrollToTop();
  }, []);

  const handleSlots = (arr) => {
    const newArrOfSlots = [];
    arr.forEach((data) => {
      newArrOfSlots.push(data.value);
    });
    setSlots([...newArrOfSlots]);
  };

  const checkboxOptions = [
    {
      id: 1,
      name: "areaOfExpertise",
      title: "Body building",
    },
    {
      id: 2,
      name: "areaOfExpertise",
      title: "Cardio strength",
    },
    {
      id: 3,
      name: "areaOfExpertise",
      title: "Weight lifting",
    },
    {
      id: 4,
      name: "areaOfExpertise",
      title: "Total body",
    },
    {
      id: 5,
      name: "areaOfExpertise",
      title: "Jogging & running",
    },
    {
      id: 6,
      name: "areaOfExpertise",
      title: "Yoga & meditation",
    },
  ];

  const formInfo = [
    {
      id: 1,
      title: "Full Name",
      name: "name",
    },
    {
      id: 2,
      title: "Your Email",
      name: "email",
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

  const onSubmit = (data) => {
    if (data.areaOfExpertise <= 0) {
      swal("Skills Unselected!!", "Please select your skills", "info");
      return;
    }
    scrollToTop();

    setLoading(true);

    const imageFile = { image: data.image[0] };
    const status = "Pending";
    const socialLinks = {
      facebook: "https://www.facebook.com",
      instagram: "https://www.instagram.com",
      linkedin: "https://www.linkedin.com",
    };

    const postData = async () => {
      try {
        const res = await axiosPublic.post(imgbb_api_url, imageFile, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const image = res.data?.data.url;

        const newTrainer = {
          ...data,
          image,
          status,
          socialLinks,
          availableSlots: slots,
        };

        const response = await axiosPublic.post(
          `/applied-trainers?email=${newTrainer.email}`,
          newTrainer
        );
        if (response?.data?.message === "already_applied") {
          swal(
            "Already Applied",
            "You are already applied. With this email address",
            "info"
          );
          return;
        }

        if (response?.data?.message === "trainer_exist") {
          swal(
            "Trainer Exist",
            "You are already a trainer. Email exist!!",
            "error"
          );
          return;
        }
        if (response.data?.insertedId) {
          swal(
            "Success",
            "You have application successful to become a trainer",
            "success"
          );
          saveUserInfo(data?.email);
          reset();
        }
      } catch (error) {
        swal("Something Wrong!", `${error.message}`, "error");
      } finally {
        setLoading(false);
      }
    };
    postData();
  };

  const checkboxItems = checkboxOptions.map((option) => (
    <div key={option.id} className="-mt-5">
      <label className="inline-flex items-center cursor-pointer">
        <input
          {...register(option.name)}
          type="checkbox"
          value={option.title}
          className="bg-transparent text-[#4A4E4B]   rounded focus:ring-0 focus:outline-none mr-2 p-2"
        />
        <span className="text-[#4A4E4B]">{option.title}</span>
      </label>
    </div>
  ));

  return (
    <section className="min-h-screen">
      <CustomHelmet title={"Become trainer"} />
      <PageBanner title="Be A Trainer" link={`/be-a-trainer`} />
      <div className="container mx-auto px-4 md:py-16 py-12">
        {loading ? (
          <LoadingSpinner />
        ) : (
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
                      className={`bg-transparent text-[#4A4E4B]   block w-full ${
                        item.type === "file" ? "py-2" : "py-2.5"
                      } px-5 focus:outline-none placeholder-[#a6a7a6]`}
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

                {/* Select Slots */}
                <div className="md:col-span-2">
                  <label className="font-bold text-gray-800 text-[14px] md:text-[16px] block mb-1">
                    Available Days in Week
                  </label>
                  <Select
                    // onChange={handleGetDays}
                    onChange={handleSlots}
                    isMulti
                    options={slotData}
                    className="basic-multi-select w-full"
                    required
                  />
                </div>

                {/* Biography */}
                <div className="md:col-span-2">
                  <label className="font-bold text-gray-800 text-[14px] md:text-[16px] block mb-1">
                    Brief Biography
                  </label>
                  <textarea
                    className="bg-transparent text-[#4A4E4B]   block w-full py-2.5 px-5 focus:outline-none placeholder-[#a6a7a6]"
                    placeholder="Your brief biography"
                    rows={4}
                    required
                    {...register("biography")}
                  ></textarea>
                </div>
              </div>
              <ButtonPrimary customClass="w-full py-2.5 border-custom-primary mt-5">
                Apply
              </ButtonPrimary>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default BeATrainer;
