import { IoCheckmarkDoneOutline } from "react-icons/io5";

const aboutUsImg =
  "https://images.pexels.com/photos/20379134/pexels-photo-20379134/free-photo-of-man-in-cap-exercising-at-gym.jpeg?auto=compress&cs=tinysrgb&w=400";
const AboutUs = () => {
  return (
    <section className="flex md:flex-row flex-col gap-8 justify-between container mx-auto px-4 lg:py-16 md:py-12 py-8 max-w-4xl md:mt-8 mt-5 ">
      <div className="flex-1 ">
        <h2 className="md:text-4xl text-3xl font-bold uppercase">
          Behind The story of SyncFit
        </h2>
        <p className="text-custom-primary mb-8 mt-2">
          Know about us what's behind the story
        </p>
        <p className="text-gray-600">
          Quisque tortor risus, pharetra ut venenatis ac, rutrum eget ante fusce
          in convallis nibh felis rana hendrerit diam rhoncus eget sonec dictum
          acus element sifend nisa efficitur venenatis. Quisque tortor risus,
          pharetra ut venenatis ac, rutrum eget ante fusce in convallis nibh
          felis rana hendrerit diam rhoncus eget sonec dictum acus element
          sifend nisa efficitur venenatis.
        </p>

        <ul className="list-none mt-7 space-y-2">
          <li className="flex items-center gap-1">
            <IoCheckmarkDoneOutline className="text-custom-primary text-2xl" />
            <span>Over 15 years of experience</span>
          </li>
          <li className="flex items-center gap-1">
            <IoCheckmarkDoneOutline className="text-custom-primary text-2xl" />
            <span>Certified Trainers</span>
          </li>
          <li className="flex items-center gap-1">
            <IoCheckmarkDoneOutline className="text-custom-primary text-2xl" />
            <span>Exceptional work quality</span>
          </li>
        </ul>
      </div>
      <figure className="flex-1 flex justify-center md:justify-end">
        <img src={aboutUsImg} alt="" />
      </figure>
    </section>
  );
};

export default AboutUs;
