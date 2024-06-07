import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import ButtonPrimary from "./../../../components/shared/ButtonPrimary/ButtonPrimary";
import LoadingSpinner from "./../../../components/shared/LoadingSpinner/LoadingSpinner";
import SectionHeader from "./../../../components/shared/SectionHeader/SectionHeader";
import useAxiosPublic from "./../../../hooks/useAxiosPublic";
import useAuth from "./../../../hooks/useAuth";
import { scrollToTop } from "./../../../utilities/scrollToTop";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import Select from "react-select";
import slotData from "./slotData";
import useSecureData from "./../../../hooks/useSecureData";

const AddNewSlot = () => {
  const [preselectedOptions, setPreselectedOptions] = useState([]);
  const [slotExistError, setSlotExistError] = useState(null);
  const [trainer, setTrainer] = useState({});
  const [loading, setLoading] = useState(true);
  const [className, setClassName] = useState([]);
  const [slots, setSlots] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    scrollToTop();
  }, []);

  const { data: class_names, isLoading } = useSecureData(
    ["class_names"],
    "/all-class-name"
  );

  useEffect(() => {
    if (!user?.email) {
      setLoading(true);
    }
    const loadTrainer = async () => {
      try {
        const res = await axiosSecure.get(
          `/trainer-by-email?email=${user?.email}`
        );
        setTrainer(res?.data);
        setPreselectedOptions(res?.data?.availableSlots);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadTrainer();
  }, [user?.email, axiosSecure, user]);

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
      defValue: trainer?.name,
      readOnly: true,
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
      defValue: trainer?.age,
      readOnly: true,
    },

    {
      id: 4,
      title: "Profile Image",
      name: "image",
      defValue: trainer?.image,
      readOnly: true,
    },
  ];

  const handleSlots = (arr) => {
    setSlotExistError(null);
    arr.forEach((item) => {
      if (preselectedOptions.includes(item?.value)) {
        setSlotExistError(`${item.value} slot already exist!!`);
      }
    });
    setSlots(arr);
  };

  const handleClasses = (selectedClasses) => {
    setClassName(selectedClasses);
  };

  const onSubmit = (data) => {
    if (data.areaOfExpertise <= 0) {
      swal("Skills Unselected!!", "Please select your skills", "error");
      return;
    }
    setLoading(true);

    const status = "Pending";
    const socialLinks = {
      facebook: "https://www.facebook.com",
      instagram: "https://www.instagram.com",
      linkedin: "https://www.linkedin.com",
    };

    console.log(slots, className)

    const postData = async () => {
      try {
        const newTrainer = {
          ...data,
          status,
          socialLinks,
          // availableSlots,
        };

        const response = await axiosPublic.post(
          `/applied-trainers?email=${newTrainer.email}`,
          newTrainer
        );
        if (response?.data?.message === "already_applied") {
          swal(
            "Already Applied",
            "You are already applied. Your application is under processing..",
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
          reset();
        }
      } catch (error) {
        swal("Something Wrong!", `${error.message}`, "error");
      } finally {
        setLoading(false);
      }
    };
    // postData();
  };

  const checkboxItems = checkboxOptions.map((option) => (
    <div key={option.id} className="-mt-5">
      <label className="inline-flex items-center cursor-pointer">
        <input
          {...register(option.name)}
          type="checkbox"
          checked={trainer?.areaOfExpertise?.includes(option.title)}
          disabled
          value={option.title}
          className="bg-transparent text-[#4A4E4B] border border-gray-500 rounded focus:ring-0 focus:outline-none mr-2 p-2"
        />
        <span className="text-[#4A4E4B]">{option.title}</span>
      </label>
    </div>
  ));

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="min-h-screen">
      <SectionHeader
        title="Add New Slot"
        description="In here you can add new slot"
      />
      <div>
        <div className="bg-custom-secondary md:p-12 p-6 mx-auto ">
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
              <div>
                <label className="font-bold text-gray-800 text-[14px] md:text-[16px] block mb-1">
                  Your Current Slots
                </label>
                <ul>
                  {preselectedOptions?.map((item) => (
                    <li className="text-gray-500 italic " key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add new slot */}
              <div>
                <label className="font-bold text-gray-800 text-[14px] md:text-[16px] block mb-1">
                  Add New Slot
                </label>
                <Select isMulti onChange={handleSlots} options={slotData} />
                <small className="text-red-500">{slotExistError}</small>
              </div>

              {/* select classes */}
              <div>
                <label className="font-bold text-gray-800 text-[14px] md:text-[16px] block mb-1">
                  Add classes
                </label>
                <Select
                  isMulti
                  onChange={handleClasses}
                  options={class_names}
                />
                <small className="text-red-500">{slotExistError}</small>
              </div>

              <div className="md:col-span-2">
                <label className="font-bold text-gray-800 text-[14px] md:text-[16px] block mb-1">
                  Brief Biography
                </label>
                <textarea
                  className="bg-transparent text-[#4A4E4B] border border-gray-500 block w-full py-2.5 px-5 focus:outline-none placeholder-[#4A4E4B]"
                  placeholder="Your brief biography"
                  rows={4}
                  defaultValue={trainer?.biography}
                  readOnly
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
      </div>
    </section>
  );
};

export default AddNewSlot;
