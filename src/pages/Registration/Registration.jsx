import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "../../components/shared/ButtonPrimary/ButtonPrimary";
import PageBanner from "../../components/shared/PageBanner/PageBanner";
import { useForm } from "react-hook-form";
import googleIcon from "../../assets/svg/google.svg";
import useAuth from "./../../hooks/useAuth";
import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import swal from "sweetalert";
import { scrollToTop } from "../../utilities/scrollToTop";

const formInfo = [
  { id: 1, title: "Your Name", placeholder: "Your Name", name: "name" },
  {
    id: 2,
    title: "Photo Url",
    placeholder: "Your Photo Url",
    name: "photoUrl",
  },
  {
    id: 3,
    title: "Your Email",
    placeholder: "Your Email",
    name: "email",
    type: "email",
  },
  {
    id: 4,
    title: "Password",
    placeholder: "Password",
    name: "password",
    type: "password",
  },
];

const Registration = () => {
  const { register, handleSubmit } = useForm();
  const { createNewUser, updateUserProfile, singInWithGoogle } = useAuth();
  const [isShowPass, setIsShowPass] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
  }, []);

  const onSubmit = async (data) => {
    try {
      await createNewUser(data.email, data.password);
      await updateUserProfile(data.name, data.photoUrl);

      swal("Success", "Your member account register successfully!!", "success");
      navigate("/");
    } catch (error) {
      swal("Error", `${error.message}`, "error");
    }
  };

  const handleLogInWithGoogle = async () => {
    try {
      await singInWithGoogle();
      swal("Success", "Your member account register successfully!!", "success");
      navigate("/");
    } catch (error) {
      swal("Error", `${error.message}`, "error");
    }
  };

  return (
    <section className="min-h-screen">
      <PageBanner title="Registration" link="/registration" />
      <div className="container mx-auto px-4 md:py-16 py-12">
        <div className="bg-custom-secondary max-w-xl md:p-12 p-6 mx-auto shadow-sm ">
          <h2 className="md:text-5xl font-bold text-4xl mb-5">
            Register your account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {formInfo.map((item) => (
              <div key={item.id} className="mb-4 relative">
                <label className="font-bold text-gray-800 text-[14px] md:text-[16px] block mb-[10px]">
                  {item.title}
                </label>
                <input
                  {...register(item.name)}
                  className="bg-transparent text-[#4A4E4B] border border-gray-500 block w-full py-3 px-5 focus:outline-none placeholder-[#4A4E4B]"
                  placeholder={item.placeholder}
                  required
                  type={(!isShowPass && item.type) || "text"}
                />
                {item.type === "password" && (
                  <div
                    onClick={() => setIsShowPass(!isShowPass)}
                    className="cursor-pointer text-lg absolute right-4 top-12"
                  >
                    {isShowPass ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </div>
                )}
              </div>
            ))}
            <label htmlFor="term-policy">
              <input type="checkbox" id="term-policy" className="mr-2" />
              Accept our terms and policy
            </label>
            <ButtonPrimary customClass="w-full py-3 border-custom-primary mt-5">
              Create your account
            </ButtonPrimary>
          </form>
          <div className="flex flex-col items-center">
            <p className="text-2xl mt-5 mb-2">Or</p>
            <button
              onClick={handleLogInWithGoogle}
              className=" flex items-center  justify-center gap-x-3 text-sm sm:text-base  rounded-lg bg-gray-800 text-white duration-300 transition-colors border px-8 py-2.5"
            >
              <img src={googleIcon} className="w-6" alt="" />
              <span>Continue with Google</span>
            </button>
          </div>
          <p className="mt-5 text-center">
            Already Have an account?{" "}
            <Link to={"/login"}>
              <strong className="hover:text-custom-primary duration-300 transition">
                Login
              </strong>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Registration;
