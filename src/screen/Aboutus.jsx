import React from "react";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <div className="container px-4 py-16 mx-auto mt-10 text-center">
      <Helmet>
        <title>About Us - PDF Tools</title>
        <meta
          name="description"
          content="Learn more about PDF Tools, your go-to solution for fast, easy, and secure PDF processing. Discover our mission, vision, and why you should choose us."
        />
        <meta property="og:title" content="About Us - PDF Tools" />
        <meta
          property="og:description"
          content="Learn more about PDF Tools, your go-to solution for fast, easy, and secure PDF processing. Discover our mission, vision, and why you should choose us."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pdfsmalltools.com/about" />
        <meta
          property="og:image"
          content="https://pdfsmalltools.com/pdfIcon/editPdfs.svg"
        />
      </Helmet>

      <h1 className="mb-6 text-5xl font-extrabold text-blue-800">About Us</h1>
      <p className="max-w-3xl mx-auto mb-8 text-lg leading-relaxed text-gray-700">
        Welcome to our PDF Tools platform – your go-to solution for fast, easy,
        and secure PDF processing. We believe that managing PDF files should be
        straightforward and accessible to everyone, whether for work, study, or
        personal use. Our platform offers a range of intuitive tools designed to
        make your PDF tasks simpler, quicker, and more efficient.
      </p>

      <div className="flex flex-wrap justify-center gap-8 mb-12">
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-lg md:w-1/3">
          <h2 className="mb-2 text-2xl font-semibold text-blue-700">
            Our Mission
          </h2>
          <p className="leading-relaxed text-gray-600">
            Our mission is to empower users by providing a suite of reliable and
            accessible PDF tools. We strive to simplify document management for
            individuals and businesses, making it easier to handle PDFs without
            requiring any specialized software.
          </p>
        </div>
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-lg md:w-1/3">
          <h2 className="mb-2 text-2xl font-semibold text-blue-700">
            Our Vision
          </h2>
          <p className="leading-relaxed text-gray-600">
            We envision a world where digital document management is seamless
            and universally accessible. Our goal is to expand our PDF toolset
            continually, adapting to new challenges and meeting the evolving
            needs of our users.
          </p>
        </div>
      </div>

      <div className="p-8 mb-12 bg-gray-100 rounded-lg shadow-md">
        <h2 className="mb-4 text-3xl font-bold text-blue-700">
          Why Choose Our Platform?
        </h2>
        <ul className="max-w-2xl mx-auto leading-relaxed text-left text-gray-600 list-disc list-inside">
          <li className="mb-3">
            <strong>Comprehensive Tool Suite:</strong> We offer a variety of PDF
            tools, including conversion, merging, splitting, compression, and
            more, all from one easy-to-use platform.
          </li>
          <li className="mb-3">
            <strong>High-Quality Output:</strong> Our tools maintain the quality
            of your original documents, ensuring that converted or edited files
            meet professional standards.
          </li>
          <li className="mb-3">
            <strong>Secure Processing:</strong> We prioritize your privacy and
            security. All file uploads are encrypted, and we delete files
            automatically after processing to keep your information safe.
          </li>
          <li className="mb-3">
            <strong>Cross-Platform Access:</strong> Access our tools from any
            device, including desktops, laptops, tablets, and smartphones,
            giving you the flexibility to manage your PDFs anytime, anywhere.
          </li>
        </ul>
      </div>

      <div className="px-6 py-12 rounded-lg shadow-lg bg-blue-50">
        <h2 className="mb-6 text-3xl font-bold text-blue-700">
          Our Core Features
        </h2>
        <div className="grid gap-8 text-left text-gray-700 md:grid-cols-3">
          <div>
            <h3 className="mb-2 text-xl font-semibold">PDF Conversion</h3>
            <p>
              Convert PDFs to and from various formats, including Word, Excel,
              PowerPoint, and images, all while preserving the quality of your
              documents.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold">Merge & Split PDFs</h3>
            <p>
              Combine multiple PDF files into one or split a large PDF into
              smaller, more manageable files with ease.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold">Compress PDFs</h3>
            <p>
              Reduce file size to make PDFs more shareable and easier to store,
              without compromising the quality of your documents.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold">Edit & Annotate</h3>
            <p>
              Easily edit and annotate PDF documents, add text, shapes, and
              highlights to meet your document needs.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold">Secure Your PDFs</h3>
            <p>
              Protect sensitive information by adding password protection to
              your PDF files or by removing restrictions.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold">Rotate & Organize</h3>
            <p>
              Rotate, reorder, and organize PDF pages to ensure your documents
              are perfectly aligned.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-4 text-3xl font-bold text-blue-700">
          Get Started with Our Tools Today
        </h2>
        <p className="max-w-2xl mx-auto mb-6 text-lg leading-relaxed text-gray-600">
          Our PDF tools are designed to simplify your workflow. Whether you're a
          student, a business professional, or just someone looking to manage
          their documents more efficiently, we’re here to help. Try out our
          tools today and experience the ease and flexibility of comprehensive
          PDF management.
        </p>
        <a
          href="/tools"
          className="inline-block px-8 py-3 text-lg font-semibold text-white transition-all duration-300 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700"
        >
          Explore Our PDF Tools
        </a>
      </div>
    </div>
  );
};

export default About;
