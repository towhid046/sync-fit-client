import { useEffect } from "react";
import Hero from "./Hero/Hero";
import { scrollToTop } from "./../../utilities/scrollToTop";
import Features from "./Features/Features";

const HomePage = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div>
      <Hero />
      <Features />
    </div>
  );
};

export default HomePage;
