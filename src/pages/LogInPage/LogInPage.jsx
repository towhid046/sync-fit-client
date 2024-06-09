import { Link, useLocation, useNavigate } from "react-router-dom";
import ButtonPrimary from "../../components/shared/ButtonPrimary/ButtonPrimary";
import PageBanner from "./../../components/shared/PageBanner/PageBanner";
import googleIcon from "../../assets/svg/google.svg";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { scrollToTop } from "../../utilities/scrollToTop";

const formInfo = [
  {
    id: 1,
    title: "Your Email",
    placeholder: "Your Email",
    name: "email",
    type: "email",
  },
  {
    id: 2,
    title: "Password",
    placeholder: "Password",
    name: "password",
    type: "password",
  },
];

const LogInPage = () => {
  const { register, handleSubmit } = useForm();
  const { logInUser, singInWithGoogle, setLoading, } = useAuth();
  const [isShowPass, setIsShowPass] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    scrollToTop();
  }, []);

  const onSubmit = async (data) => {
    try {
      await logInUser(data.email, data.password);
      swal("Success", "Your member account login successfully!!", "success");
      navigate(location?.state ? location?.state : "/");
    } catch (error) {
      swal("Error", `${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogInWithGoogle = async () => {
    try {
      await singInWithGoogle();
      swal("Success", "Your member account login successfully!!", "success");
      navigate(location?.state ? location?.state : "/");
    } catch (error) {
      swal("Error", `${error.message}`, "error");
    }
  };

  return (
    <section className="min-h-screen">
      <PageBanner title="Login" link="/login" />
      <div className="container mx-auto px-4 md:py-16 py-12">
        <div className="bg-custom-secondary max-w-xl md:p-12 p-6 mx-auto shadow-sm ">
          <h2 className="md:text-5xl font-bold text-4xl mb-5">
            Login your account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {formInfo.map((item) => (
              <div key={item.id} className="mb-4 relative">
                <label className="font-bold text-gray-800 text-[14px] md:text-[16px] block mb-1">
                  {item.title}
                </label>
                <input
                  className="bg-transparent text-[#4A4E4B] border border-gray-500 block w-full py-3 px-5 focus:outline-none placeholder-[#a6a7a6]"
                  placeholder={item.placeholder}
                  required
                  type={(!isShowPass && item.type) || "text"}
                  {...register(item.name)}
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
            <label htmlFor="remember-me">
              <input type="checkbox" id="remember-me" className="mr-2" />
              Remember me
            </label>
            <ButtonPrimary customClass="w-full py-3 border-custom-primary mt-5">
              Login
            </ButtonPrimary>
          </form>
          <div className="flex flex-col items-center">
            <p className="text-2xl mt-5 mb-2">Or</p>
            <button
              onClick={handleLogInWithGoogle}
              className=" flex items-center  justify-center gap-x-3 text-sm sm:text-base bg-gray-800 text-white duration-300 transition-colors border px-8 py-2.5"
            >
              <img src={googleIcon} className="w-6" alt="" />
              <span>Continue with Google</span>
            </button>
          </div>
          <p className="mt-5 text-center text-gray-500">
            Don't Have an account?{" "}
            <Link to={"/registration"}>
              <span className="underline text-custom-primary italic duration-300 transition">
                Registration
              </span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LogInPage;
