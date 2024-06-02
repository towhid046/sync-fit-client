import { useEffect } from "react";
import Hero from "./Hero/Hero";
import { scrollToTop } from "./../../utilities/scrollToTop";
import Features from "./Features/Features";
import AboutUs from "./AboutUs/AboutUs";
import Classes from "./Classes/Classes";
import Testimonials from "./Testimonials/Testimonials";
import Forums from "./Forums/Forums";

const HomePage = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div>
      <Hero />
      <Features />
      <AboutUs />
      <Classes />
      <Testimonials />
      <Forums />
    </div>
  );
};

export default HomePage;
