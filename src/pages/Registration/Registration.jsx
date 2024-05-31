import { Link } from "react-router-dom";
import ButtonPrimary from "../../components/shared/ButtonPrimary/ButtonPrimary";

const formInfo = [
  { id: 1, title: "Your Name", placeholder: "Your Name", name: "name" },
  {
    id: 2,
    title: "Photo Url",
    placeholder: "Your Photo Url",
    name: "photoUrl",
  },
  {
    id:3,
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
  return (
    <section className="container mx-auto px-4 my-32 min-h-screen">
      <div className="bg-custom-secondary max-w-xl md:p-12 p-6 mx-auto shadow-sm mt-12">
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
          <label htmlFor="term-policy">
            <input type="checkbox" id="term-policy" className="mr-2" />
            Accept our terms and policy
          </label>
          <ButtonPrimary customClass="w-full py-3 border-custom-primary mt-5">
            Create your account
          </ButtonPrimary>
        </form>
        <p className="mt-5">Already Have an account? <Link to={'/login'}><strong className="hover:text-custom-primary duration-300 transition">Login</strong></Link></p>
      </div>
    </section>
  );
};

export default Registration;
