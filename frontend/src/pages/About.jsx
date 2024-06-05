import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function About() {
  return (
    <>
      <Navbar />
      <div>
        <img
          src="../../public/about.jpeg"
          className="resized-image"
          alt="Meowtopia"
        />
      </div>

      <div className="py-20 px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-slate-800">
          About Meowtopia
        </h1>
        <p className="mb-6 text-slate-700 text-lg">
          Welcome to Meowtopia, your trusted partner in providing the best care
          and products for your beloved pets. Our mission is to ensure every pet
          and pet owner enjoys a happy, healthy, and fulfilling life together.
        </p>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">
            Our Story
          </h2>
          <p className="mb-4 text-slate-700">
            Meowtopia was founded with a deep love for animals and a commitment
            to excellence in pet care. From our humble beginnings as a small
            neighborhood store, we have grown into a leading pet store known for
            our exceptional products and services.
          </p>
          <p className="mb-4 text-slate-700">
            We understand that pets are family, and we strive to offer the best
            for your furry, feathered, and scaled friends. Our team is
            passionate about animals and dedicated to helping you find exactly
            what you need to keep your pets happy and healthy.
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">
            Meet Our Team
          </h2>
          <p className="mb-4 text-slate-700">
            Our team of experts includes experienced veterinarians, professional
            groomers, and knowledgeable pet care specialists. We are all
            dedicated to providing the highest level of service and care to both
            pets and their owners.
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">
            Customer Testimonials
          </h2>
          <blockquote className=" pl-4 mb-4 text-slate-700">
            "Meowtopia has been a lifesaver for us! Their team is so
            knowledgeable and helpful, and our dog loves their grooming
            services. We wouldn't go anywhere else."
          </blockquote>
          <blockquote className=" pl-4 text-slate-700">
            "The best pet store in town! Great selection of products and the
            staff truly cares about the animals. Highly recommend!" - Meowtopia.
          </blockquote>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800">
            Contact Us
          </h2>
          <p className="mb-4 text-slate-700">
            Have questions or need assistance? Reach out to us at{" "}
            <a
              href="mailto:ismail.kouar9@gmail.com"
              className="text-blue-600 underline"
            >
              ismail.kouar9@gmail.com
            </a>{" "}
            or call us at (+212)600000000. We're here to help!
          </p>
        </div>
      </div>

      <div className="min-w-screen min-h-screen bg-gray-50 flex items-center justify-center py-5">
        <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-16 md:py-24 text-gray-800">
          <div className="w-full max-w-6xl mx-auto">
            <div className="text-center max-w-xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-bold mb-5 text-gray-600">
                What people <br />
                are saying.
              </h1>
              <h3 className="text-4xl mb-100 font-light">About-Us.</h3>
              <div className="text-center mb-10">
                <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
                <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
                <span className="inline-block w-40 h-1 rounded-full bg-indigo-500"></span>
                <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
                <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
              </div>
            </div>
            <div className="-mx-3 md:flex items-start">
              {[
                {
                  img: "https://i.pravatar.cc/100?img=1",
                  name: "Kenzie Edgar",
                  text: "I appreciate the cleanliness and organization of your store. It makes shopping a pleasant experience every time.",
                },
                {
                  img: "https://i.pravatar.cc/100?img=2",
                  name: "Stevie Tifft",
                  text: "I love the way you support local shelters and rescues. It’s great to see a business that gives back to the community.",
                },
                {
                  img: "https://i.pravatar.cc/100?img=3",
                  name: "Tommie Ewart",
                  text: "The atmosphere in your store is so welcoming, and my pets feel comfortable every time we visit. Thank you for creating such a pet-friendly environment!",
                },
                {
                  img: "https://i.pravatar.cc/100?img=4",
                  name: "Charlie Howse",
                  text: "Your store has the best selection of unique and durable pet toys. My pets are always entertained!",
                },
                {
                  img: "https://i.pravatar.cc/100?img=5",
                  name: "Nevada Herbertson",
                  text: "The pet adoption events you host are wonderful. It’s heartwarming to see so many animals finding loving homes.",
                },
                {
                  img: "https://i.pravatar.cc/100?img=6",
                  name: "Kris Stanton",
                  text: "I appreciate the eco-friendly products you carry. It’s great to see a store that cares about the environment.",
                },
              ].map((testimonial, index) => (
                <div className="px-3 md:w-1/3" key={index}>
                  <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                    <div className="w-full flex mb-4 items-center">
                      <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                        <img src={testimonial.img} alt={testimonial.name} />
                      </div>
                      <div className="flex-grow pl-3">
                        <h6 className="font-bold text-sm uppercase text-gray-600">
                          {testimonial.name}
                        </h6>
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text-sm leading-tight">
                        <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                          "
                        </span>
                        {testimonial.text}
                        <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                          "
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
          <div>
            <a
              title="Buy me a product"
              href="/products"
              target="_blank"
              className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12"
            >
              <img
                className="object-cover object-center w-full h-full rounded-full"
                src="../../public/kitten.png"
                alt="Buy me a product"
              />
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
