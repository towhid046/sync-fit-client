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
  const [trainer, setTrainer] = useState({});
  const [loading, setLoading] = useState(true);

  const [preselectedSlotOptions, setPreselectedSlotOptions] = useState([]);
  const [preselectedClassOptions, setPreselectedClassOptions] = useState([]);

  const [slotExistError, setSlotExistError] = useState(null);
  const [classExistError, setClassExistError] = useState(null);

  const [slots, setSlots] = useState([]);
  const [classes, setClasses] = useState([]);

  // --------------------------------------------------
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
        setPreselectedSlotOptions(res?.data?.availableSlots);
        setPreselectedClassOptions(res?.data?.classes);
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
      title: "Profile Image Url",
      name: "image",
      defValue: trainer?.image,
      readOnly: true,
    },
  ];

  const handleSlots = (arr) => {
    setSlotExistError(null);
    arr.forEach((item) => {
      if (preselectedSlotOptions.includes(item.value)) {
        return setSlotExistError(`${item.value} slot already exist!!`);
      }
    });

    const newArrOfSlots = [];
    arr.forEach((data) => {
      newArrOfSlots.push(data.value);
    });
    setSlots([...preselectedSlotOptions, ...newArrOfSlots]);
  };

  const handleClasses = (selectedClasses) => {
    setClassExistError(null);
    selectedClasses.forEach((item) => {
      if (preselectedClassOptions?.includes(item.value)) {
        return setClassExistError(`${item.value} class already exist!!`);
      }
    });

    const newArrOfClasses = [];
    selectedClasses.forEach((data) => {
      newArrOfClasses.push(data.value);
    });
    if (preselectedClassOptions?.length > 0) {
      setClasses([...preselectedClassOptions, ...newArrOfClasses]);
      return;
    }
    setClasses([...newArrOfClasses]);
  };

  const onSubmit = (data) => {
    if (slotExistError || classExistError) {
      swal(
        "Something Wrong!",
        `You have select some ${slotExistError ? "slots " : ""} ${
          classExistError ? "classes " : ""
        }that already in your list`,
        "error"
      );
      return;
    }
    setLoading(true);

    const updatedTrainerInfo = {
      availableSlots: slots,
      classes,
    };

    const putData = async () => {
      try {
        const response = await axiosPublic.put(
          `/update-trainer?email=${data.email}`,
          updatedTrainerInfo
        );
        console.log(response.data);
      } catch (error) {
        swal("Something Wrong!", `${error.message}`, "warning");
      } finally {
        setLoading(false);
      }
    };
    putData();
  };

  const checkboxItems = checkboxOptions.map((option) => (
    <div key={option.id} className="-mt-5">
      <label className="inline-flex items-center cursor-pointer">
        <input
          {...register(option.name)}
          type="checkbox"
          checked={trainer?.areaOfExpertise?.includes(option.title)}
          readOnly
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

              {/* Current Slots */}
              <div>
                <label className="font-bold text-gray-800 text-[14px] md:text-[16px] block mb-1">
                  Your Current Slots
                </label>
                <ul>
                  {preselectedSlotOptions?.map((item) => (
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
                <Select
                  isMulti
                  onChange={handleSlots}
                  options={slotData}
                  placeholder="Select new slot"
                />
                <small className="text-red-500">{slotExistError}</small>
              </div>

              {/* selected classes */}
              <div
                className={`${
                  preselectedClassOptions?.length ? "block" : "hidden"
                }`}
              >
                <label className="font-bold text-gray-800 text-[14px] md:text-[16px] block mb-1">
                  Your Current Classes
                </label>
                <ul>
                  {preselectedClassOptions?.map((item) => (
                    <li className="text-gray-500 italic " key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add new classes */}
              <div
                className={`${
                  preselectedClassOptions?.length ? "block" : "md:col-span-2"
                }`}
              >
                <label className="font-bold text-gray-800 text-[14px] md:text-[16px] block mb-1">
                  Add classes
                </label>
                <Select
                  required
                  isMulti
                  onChange={handleClasses}
                  options={class_names}
                  placeholder="Select class, you can select one or more"
                />
                <small className="text-red-500">{classExistError}</small>
              </div>

              <div className="md:col-span-2">
                <label className="font-bold text-gray-800 text-[14px] md:text-[16px] block mb-1">
                  Your Brief Biography
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
              Submit
            </ButtonPrimary>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddNewSlot;