import { Slide } from "react-awesome-reveal";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const aboutUsImg =
  "https://images.pexels.com/photos/20379134/pexels-photo-20379134/free-photo-of-man-in-cap-exercising-at-gym.jpeg?auto=compress&cs=tinysrgb&w=400";
const AboutUs = () => {
  return (
    <section className="flex md:flex-row flex-col gap-8 justify-between container mx-auto px-4 lg:py-16 md:py-12 py-8 max-w-4xl md:pt-8">
      <Slide direction="left" className="flex-1">
      <div>
        <h2 className="md:text-4xl text-3xl font-bold uppercase">
          Behind The story of SyncFit
        </h2>
        <p className="text-custom-primary mb-8 mt-2">
          Know about us what's behind the story
        </p>
        <p className="text-gray-600">
          At SyncFit, we believe in more than just workouts; we're dedicated to
          revolutionizing your fitness journey. Our platform offers a seamless
          experience where you can easily book expert trainers who specialize in
          catering to truckers' unique needs. Whether you're on the road or at
          home, SyncFit brings the gym to you. We understand the challenges of
          maintaining a healthy lifestyle while living life on the go, which is
          why we've curated a team of professionals.
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
        </Slide> 
      <Slide className="flex-1" direction="right">
      <figure className="flex justify-center md:justify-end">
        <img src={aboutUsImg} alt="" />
      </figure>
      </Slide>
    </section>
  );
};

export default AboutUs;
