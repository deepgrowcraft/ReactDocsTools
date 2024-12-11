import React from "react";

const Contact = () => {
  return (
    <div className="container px-4 py-16 mx-auto mt-10 text-center">
      <h1 className="mb-6 text-5xl font-extrabold text-blue-800">Contact Us</h1>
      <p className="max-w-2xl mx-auto mb-12 text-lg leading-relaxed text-gray-700">
        Have questions or need assistance? Reach out to us using the form below,
        and our team will get back to you as soon as possible.
      </p>

      <div className="max-w-lg p-8 mx-auto bg-white border border-gray-200 rounded-lg shadow-lg">
        <form>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 font-semibold text-left text-gray-600"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              className="w-full p-3 transition duration-150 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 font-semibold text-left text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-3 transition duration-150 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className="block mb-2 font-semibold text-left text-gray-600"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Type your message here..."
              className="w-full p-3 transition duration-150 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 font-semibold text-white transition duration-200 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="flex flex-col items-center mt-12 text-gray-600">
        <h2 className="mb-4 text-2xl font-semibold">Other Ways to Reach Us</h2>
        <div className="space-y-2">
          <p>
            <strong>Email:</strong> contact@growcraftsolution.com
          </p>
          <p>
            <strong>Phone:</strong> +91 9131426221
          </p>
          <p>
            <strong>Address:</strong> NRK Biz Park Vijay Nagar Indore MP
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
