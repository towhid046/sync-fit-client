import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import swal from "sweetalert";
import { scrollToTop } from "./../../../utilities/scrollToTop";
import PageBanner from "./../../../components/shared/PageBanner/PageBanner";
import ButtonPrimary from "./../../../components/shared/ButtonPrimary/ButtonPrimary";
import useAuth from "./../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const imgbb_api_key = import.meta.env.VITE_IMGBB_API_KEY;
const imgbb_api_url = `https://api.imgbb.com/1/upload?key=${imgbb_api_key}`;

const UserProfile = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const { updateUserProfile, user } = useAuth();

  const formInfo = [
    {
      id: 1,
      title: "Your Name",
      placeholder: "Your Name",
      name: "name",
      defValue: user?.displayName,
    },
    {
      id: 2,
      title: "New Profile Image",
      placeholder: "New Profile Image",
      name: "image",
      type: "file",
    },
    {
      id: 3,
      title: "Your Email",
      placeholder: "Your Email",
      name: "email",
      type: "email",
      defValue: user?.email,
    },
    {
      id: 4,
      title: "Last Login status",
      placeholder: "Last login status",
      name: "lastLogInInfo",
      defValue: user?.metadata?.lastSignInTime,
    },
  ];

  useEffect(() => {
    scrollToTop();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (data?.image.length) {
        const imageFile = { image: data?.image[0] };
        const res = await axiosPublic.post(imgbb_api_url, imageFile, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const image = res.data?.data?.url;
        await updateUserProfile(data?.name, image);
        swal("Success", "Your  profile updated successfully!!", "success");
        navigate("/");
        return;
      }
      await updateUserProfile(data?.name, user?.photoURL);
      navigate("/");
      swal("Success", "Your  profile updated successfully!!", "success");
    } catch (error) {
      swal("Error", `${error.message}`, "error");
    }
  };

  return (
    <section className="min-h-screen">
      <PageBanner title="Your Profile" link="/user-profile" />
      <div className="container mx-auto px-4 md:py-16 py-12">
        <h2 className="text-3xl font-medium pb-3 text-center">
          Your Current Information
        </h2>
        <div className="bg-custom-secondary max-w-3xl md:p-12 p-6 mx-auto shadow-sm ">
          <figure className="mb-5 flex justify-center items-center">
            <img
              className="w-52 h-52 rounded-full"
              src={user?.photoURL}
              alt=""
            />
          </figure>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 gap-6 grid-cols-1 mb-4">
              {formInfo.map((item) => (
                <div key={item.id} className="relative">
                  <label className="font-bold text-gray-800 text-[14px] md:text-[16px] block mb-1">
                    {item.title}
                  </label>

                  <input
                    {...register(item.name)}
                    className={`
                    bg-transparent text-[#4A4E4B] 
                    border border-gray-500 block 
                    w-full py-3 px-5 focus:outline-none
                    ${item.type === "file" && "py-2.5"}
                     placeholder-[#a6a7a6]`}
                    placeholder={item.placeholder}
                    readOnly={
                      item.type === "email" || item.name === "lastLogInInfo"
                    }
                    defaultValue={item?.defValue}
                    type={item.type || "text"}
                    required={item.type !== "file"}
                  />
                </div>
              ))}
            </div>
            <ButtonPrimary customClass="w-full py-3 border-custom-primary mt-5">
              Update
            </ButtonPrimary>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
