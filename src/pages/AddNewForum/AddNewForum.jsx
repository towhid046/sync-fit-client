import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import LoadingSpinner from "../../components/shared/LoadingSpinner/LoadingSpinner";
import ButtonPrimary from "../../components/shared/ButtonPrimary/ButtonPrimary";
import { scrollToTop } from "../../utilities/scrollToTop";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import useAuth from "./../../hooks/useAuth";
import moment from "moment";
import useSecureData from "./../../hooks/useSecureData";
import ErrorElement from "./../../components/shared/ErrorElement/ErrorElement";

const imgbb_api_key = import.meta.env.VITE_IMGBB_API_KEY;
const imgbb_api_url = `https://api.imgbb.com/1/upload?key=${imgbb_api_key}`;

const AddNewForum = () => {
  const formInfo = [
    {
      id: 1,
      title: "Forum Title",
      name: "title",
    },
    {
      id: 2,
      title: "Banner Image",
      name: "image",
      type: "file",
    },
  ];

  const [loading, setLoading] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    scrollToTop();
  }, []);

  const { user } = useAuth();

  const {
    data: singleUser,
    isLoading,
    isError,
    error,
  } = useSecureData(["single-user"], `/single-user?email=${user?.email}`);

  const onSubmit = (data) => {
    setLoading(true);
    if(isLoading){
      return setLoading(true)
    }

    const imageFile = { image: data.image[0] };

    const author = {
      name: user?.displayName,
      role: singleUser?.role,
      image: user?.photoURL,
    };
    const release_date = moment().format("MMMM Do YYYY");

    const postData = async () => {
      try {
        const res = await axiosSecure.post(imgbb_api_url, imageFile, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const thumbnail_img = res.data?.data.url;

        const newForum = {
          thumbnail_img,
          release_date,
          title: data?.title,
          description: data?.description,
          author,
          up_vote_count: 0,
          down_vote_count: 0,
        };

        const response = await axiosSecure.post("/forums", newForum);
        if (response.data?.insertedId) {
          swal("Success", `${data.title} post added!`, "success");
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

  if (isError) {
    return <ErrorElement errorText={error} />;
  }

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="min-h-screen">
      <SectionHeader
        title="Add New Forum"
        description="In here you can add new forum"
      />
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
                placeholder="Description in details"
                rows={5}
                required
                {...register("description")}
              ></textarea>
            </div>
          </div>
          <ButtonPrimary customClass="w-full py-2.5 border-custom-primary mt-5">
            Post
          </ButtonPrimary>
        </form>
      </div>
    </section>
  );
};

export default AddNewForum;
