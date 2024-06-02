import { useEffect } from "react";
import Hero from "./Hero/Hero";
import { scrollToTop } from "./../../utilities/scrollToTop";
import Features from "./Features/Features";
import AboutUs from "./AboutUs/AboutUs";
import Classes from "./Classes/Classes";

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
    </div>
  );
};

export default HomePage;
