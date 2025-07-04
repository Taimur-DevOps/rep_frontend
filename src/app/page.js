
import Banner from "./components/Banner";
import Filters from "./components/Filters";
import AboutUsSection from "./components/AboutUsSection";
import DhaPhases from "./components/DhaPhases";
import Categories from "./components/Categories";
import KeepInTouch from "./components/KeepInTouch";
import FeaturedCarousel from "./components/FeaturedCarousel";

export default function Home() {
  return (
    <>
      <Banner />
      <Filters />
      <FeaturedCarousel />
      <Categories />
      {/* <Services /> */}
      <AboutUsSection />
      <DhaPhases />
      <KeepInTouch />
    </>
  );
}
