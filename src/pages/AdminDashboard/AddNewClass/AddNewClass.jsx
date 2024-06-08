import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import LoadingSpinner from "./../../../components/shared/LoadingSpinner/LoadingSpinner";
import { scrollToTop } from "./../../../utilities/scrollToTop";
import ButtonPrimary from "./../../../components/shared/ButtonPrimary/ButtonPrimary";
import SectionHeader from "./../../../components/shared/SectionHeader/SectionHeader";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";

const imgbb_api_key = import.meta.env.VITE_IMGBB_API_KEY;
const imgbb_api_url = `https://api.imgbb.com/1/upload?key=${imgbb_api_key}`;

const AddNewClass = () => {
  const [loading, setLoading] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    scrollToTop();
  }, []);

  const formInfo = [
    {
      id: 1,
      title: "Class Name",
      name: "class_name",
    },
    {
      id: 2,
      title: "Class Image",
      name: "image",
      type: "file",
    },
  ];

  const onSubmit = (data) => {
    setLoading(true);

    const imageFile = { image: data.image[0] };

    const postData = async () => {
      try {
        const res = await axiosSecure.post(imgbb_api_url, imageFile, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const image = res.data?.data.url;

        const newClass = { ...data, image };

        const response = await axiosSecure.post("/add-new-class", newClass);
        if (response.data?.insertedId) {
          swal("Added", `${data.class_name} class added!`, "success");
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

  return (
    <section className="min-h-screen">
      <SectionHeader
        title="Add New Class"
        description="Add a new class to ensure and update materials"
      />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-custom-secondary md:p-12 p-6 mx-auto shadow-sm ">
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
                    } px-5 focus:outline-none placeholder-[#a6a7a6]`}
                    required
                    type={item.type || "text"}
                    placeholder={item.title}
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="font-bold text-gray-800 text-[14px] md:text-[16px] block mb-1">
                  Class Details
                </label>
                <textarea
                  className="bg-transparent text-[#4A4E4B] border border-gray-500 block w-full py-2.5 px-5 focus:outline-none placeholder-[#a6a7a6]"
                  placeholder="Class details"
                  rows={5}
                  required
                  {...register("description")}
                ></textarea>
              </div>
            </div>
            <ButtonPrimary customClass="w-full py-2.5 border-custom-primary mt-5">
              Add Class
            </ButtonPrimary>
          </form>
        </div>
      )}
    </section>
  );
};

export default AddNewClass;
