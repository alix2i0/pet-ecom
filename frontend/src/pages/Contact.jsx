import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Contact = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    try {
      const response = await axios.post("http://localhost:3300/api/send", data);

      if (response.status === 200) {
        console.log("Message sent.");
        setEmailSubmitted(true);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="bg-gray-50">
      <Navbar />
      <section
        id="contact"
        className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-8 "
      >
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-full h-80 w-80 z-0 blur-xl absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"></div>
        <div className="z-10">
          <h5 className="text-2xl font-bold text-gray-900 mb-4">
            Let&apos;s Connect
          </h5>
          <p className="text-gray-700 mb-6">
            I&apos;m currently looking for new opportunities, my inbox is always
            open. Whether you have a question or just want to say hi, I&apos;ll
            try my best to get back to you!
          </p>
          <div className="flex space-x-4">
            <Link to="https://github.com">
              {/* <Image src={GithubIcon} alt="Github Icon" /> */}
              <span className="text-gray-700 hover:text-blue-500">GitHub</span>
            </Link>
            <Link to="https://linkedin.com">
              {/* <Image src={LinkedinIcon} alt="Linkedin Icon" /> */}
              <span className="text-gray-700 hover:text-blue-500">
                LinkedIn
              </span>
            </Link>
          </div>
        </div>
        <div className="z-10">
          {emailSubmitted ? (
            <p className="text-green-500 text-sm mt-2">
              Email sent successfully!
            </p>
          ) : (
            <form
              className="flex flex-col bg-white shadow-md rounded-lg p-8"
              onSubmit={handleSubmit}
            >
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="jacob@google.com"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Subject
                </label>
                <input
                  name="subject"
                  type="text"
                  id="subject"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Just saying hi"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Let's talk about..."
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-5 rounded-lg w-full"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Contact;
