import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for loader
  const [errorMessage, setErrorMessage] = useState("");
  const form = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Show loader when submission starts
    setErrorMessage(""); // Clear any existing error messages

    if (form.current) {
      form.current.submit();
      setTimeout(() => {
        setIsSubmitting(false); // Stop loader after form submission
        setIsSubmitted(true);
        form.current.reset(); // Clear form after submission
      }, 3000); // Optional: Simulate network delay (adjust as needed)
    } else {
      setErrorMessage("Failed to submit the form. Please try again.");
      setIsSubmitting(false); // Stop loader in case of error
    }
  };

  return (
    <div className="container px-4 py-16 mx-auto mt-10 text-center">
      <Helmet>
        <title>PDF Small Tools - Contact Us</title>
        <meta
          name="description"
          content="Discover powerful PDF tools for all your document needs. Convert, merge, split, edit, compress PDFs and more – all in one easy-to-use platform."
        />
        <meta
          property="og:title"
          content="PDF Small Tools - Convert, Edit, Compress & More"
        />
        <meta
          property="og:description"
          content="Discover powerful PDF tools for all your document needs. Convert, merge, split, edit, compress PDFs and more – all in one easy-to-use platform."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pdfsmalltools.com/" />
        <meta
          property="og:image"
          content="https://pdfsmalltools.com/pdfIcon/editPdfs.svg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="PDF Small Tools - Convert, Edit, Compress & More"
        />
        <meta
          name="twitter:description"
          content="Discover powerful PDF tools for all your document needs. Convert, merge, split, edit, compress PDFs and more – all in one easy-to-use platform."
        />
        <meta
          name="twitter:image"
          content="https://pdfsmalltools.com/pdfIcon/editPdfs.svg"
        />
        <link rel="icon" href="https://pdfsmalltools.com/favicon.ico" />
      </Helmet>

      <h1 className="mb-6 text-5xl font-extrabold text-blue-800">Contact Us</h1>
      <p className="max-w-2xl mx-auto mb-12 text-lg leading-relaxed text-gray-700">
        Have questions or need assistance? Reach out to us using the form below,
        and our team will get back to you as soon as possible.
      </p>

      <div className="max-w-lg p-8 mx-auto bg-white border border-gray-200 rounded-lg shadow-lg">
        <form
          ref={form}
          action="https://formsubmit.co/contact@pdfsmalltools.com" // Replace with your email
          method="POST"
          onSubmit={handleFormSubmit}
          className="w-full space-y-4"
        >
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="hidden"
            name="_next"
            value="https://pdfsmalltools.com/" // Redirect after successful submission
          />

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
              required
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
              required
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
              required
              className="w-full p-3 transition duration-150 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>

          {isSubmitted && (
            <p className="mb-4 text-green-500">Message sent successfully!</p>
          )}
          {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}

          <button
            type="submit"
            disabled={isSubmitting} // Disable button while submitting
            className={`w-full px-6 py-3 font-semibold text-white transition duration-200 rounded-lg shadow-md ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Sending...
              </div>
            ) : (
              "Send Message"
            )}
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
