import { Link } from "react-router-dom";
import ButtonPrimary from "../../components/shared/ButtonPrimary/ButtonPrimary";
import PageBanner from './../../components/shared/PageBanner/PageBanner';

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
  return (
   <section className="min-h-screen">
    <PageBanner title="Login" link="/login"/>
     <div className="container mx-auto px-4 md:py-16 py-12">
      <div className="bg-custom-secondary max-w-xl md:p-12 p-6 mx-auto shadow-sm ">
        <form>
          {formInfo.map((item) => (
            <div key={item.id} className="mb-4">
              <label className="font-bold text-gray-800 text-[14px] md:text-[16px] block mb-[10px]">
                {item.title}
              </label>
              <input
                className="bg-transparent text-[#4A4E4B] border border-gray-500 block w-full py-3 px-5 focus:outline-none placeholder-[#4A4E4B]"
                placeholder={item.placeholder}
                required
                type={item.type || "text"}
                // name="name"
              />
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
        <p className="mt-5">
          Don't Have an account?{" "}
          <Link to={"/registration"}>
            <strong className="hover:text-custom-primary duration-300 transition">
              Registration
            </strong>
          </Link>
        </p>
      </div>
    </div>
   </section>
  );
};

export default LogInPage;
