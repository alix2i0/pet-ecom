// Home.jsx
import Services from "../components/Services";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sponsor from "../components/Sponsor";
import Testimonials from "../components/Testimonials";



const Home = () => {
  return (
    <div className=" flex flex-col w-full items-end pb-1.5 min-h-[1115px] max-md:px-5 bg-gray-50">
      <div className="bg-dog absolute inset-0  opacity-60 top-0"></div>

      <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full ">
        <Navbar />
      </header>

      <div className="relative h-screen max-w-full w-[1297px] max-md:mt-10">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex relative flex-col self-stretch mx-4 mt-52 max-md:mt-10 max-md:max-w-full">
              <div className="text-6xl tracking-tighter font-serif text-indigo-950 max-md:max-w-full max-md:text-4xl max-md:leading-10">
                Welcome to
                <strong className="font-semibold text-amber-600">
                  &nbsp;Meowtopia
                </strong>
                <br />
                Where Every Pet&apos;s
                <br />
                Happiness Begins!
              </div>
              <div className="mt-6 text-base font-normal  leading-8 text-gray-500 max-md:max-w-full">
                Dive into a world where wagging tails and purring companionship
                await. Our pet-centric haven is a one-stop destination for all
                your furry friend&apos;s needs. From gourmet treats to stylish
                accessories, we&apos;ve got everything to make tails wag and
                hearts flutter.
              </div>
              <button className="mt-5 flex items-center px-4 py-3 w-4/12 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-amber-600 rounded-md hover:bg-amber-700 focus:outline-none focus:ring focus:ring-amber-300 focus:ring-opacity-80">
                <span className="mx-1">Find out more</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col ml-10 mt-44 w-8/12 max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src="../../public/landing-dog.png"
              alt="Happy Pets"
            />
          </div>
        </div>
      </div>

      {/* Featured Products section */}
      <section className="bg-gray-50 h-screen py-12 w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tighter text-center text-gray-800 sm:text-4xl md:text-5xl">
            Our Best Sellers
          </h2>
          <div className="text-right">
            <a
              href="/products"
              className="text-lg font-semibold text-orange-500 hover:text-orange-600 transition-colors"
            >
              See All
            </a>
          </div>
          <div className="flex justify-center">
            <FeaturedProducts />
          </div>
        </div>
      </section>
      <section className="bg-gray-50 h-screen py-12 w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tighter text-center text-gray-800 sm:text-4xl md:text-5xl">
            Our Services
          </h2>
          <div className="flex justify-center">
            <Services />
          </div>
        </div>
      </section>

      {/* Sponsor section */}
      <section className="bg-gray-50 py-12 w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center font-bold text-gray-800 mb-6">
            Sponsors
          </h2>
          <Sponsor />
        </div>
      </section>
      {/* Testimonials section */}
      <section className="bg-gray-50 py-12 w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center font-bold text-gray-800 mb-6">
            Testimonials
          </h2>
          <Testimonials />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
