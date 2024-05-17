import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle form submission, like sending data to a server
    alert("Your message has been sent!");
  };

  return (
    <>
        <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-lg w-full px-6 py-8 mt-14 bg-white shadow-md rounded-lg">
          <div className="flex flex-col justify-center items-center mb-8">
            <h1 className="text-3xl font-light text-gray-700">Contact Us</h1>
            <p className="mt-2 text-gray-600">We&apos;d love to hear from you!</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 px-4 py-2 w-full border rounded-md"
                onChange={handleChange}
                value={formData.name}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 px-4 py-2 w-full border rounded-md"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                className="mt-1 px-4 py-2 w-full border rounded-md"
                onChange={handleChange}
                value={formData.message}
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-amber-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-amber-600 w-full"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
