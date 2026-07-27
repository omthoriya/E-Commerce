import Hero from "../../components/common/Hero";
import CategorySection from "../../components/common/CategorySection";
import FeaturedProducts from "../../components/common/FeaturedProducts";
import WhyChooseUs from "../../components/common/WhyChooseUs";
import Newsletter from "../../components/common/Newsletter";

const Home = () => {
  return (
    <>
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <WhyChooseUs />
      <Newsletter />
    </>
  );
};

export default Home;
