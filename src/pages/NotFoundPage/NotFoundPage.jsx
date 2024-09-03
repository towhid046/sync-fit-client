import { Link } from "react-router-dom";
import ButtonPrimary from "./../../components/shared/ButtonPrimary/ButtonPrimary";
import CustomHelmet from "./../../components/shared/CustomHelmet/CustomHelmet";

const NotFoundPage = () => {
  return (
    <section className="min-h-screen bg-gray-900 flex flex-col gap-3 justify-center items-center">
      <CustomHelmet title={"Not Found"} />
      <h1 className="text-gray-400 font-bold xl:text-5xl lg:text-4xl text-3xl">
        Opps! Error: 404
      </h1>
      <h2 className="text-gray-600 font-semibold text-center lg:text-3xl text-2xl">
        Page not found
      </h2>
      <Link to={"/"} className="">
        <ButtonPrimary className="">Return to Home</ButtonPrimary>
      </Link>
    </section>
  );
};

export default NotFoundPage;
