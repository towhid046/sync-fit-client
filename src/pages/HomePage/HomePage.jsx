import { useEffect } from "react";
import Hero from "./Hero/Hero";
import { scrollToTop } from "./../../utilities/scrollToTop";
import Features from "./Features/Features";
import AboutUs from "./AboutUs/AboutUs";
import Classes from "./Classes/Classes";
import Testimonials from "./Testimonials/Testimonials";
import Forums from "./Forums/Forums";
import NewsLetter from "./NewsLetter/NewsLetter";
import Team from "./Team/Team";
import CustomHelmet from './../../components/shared/CustomHelmet/CustomHelmet';

const HomePage = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div>
      <CustomHelmet title={'Home'}/>
      <Hero />
      <Features />
      <AboutUs />
      <Classes />
      <Testimonials />
      <Forums />
      <NewsLetter />
      <Team />
    </div>
  );
};

export default HomePage;
