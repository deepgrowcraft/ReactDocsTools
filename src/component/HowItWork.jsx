import React from "react";
import {
  FaFileUpload,
  FaTools,
  FaEdit,
  FaShieldAlt,
  FaFileAlt,
  FaShare,
} from "react-icons/fa";

const steps = [
  {
    title: "Upload Your File",
    description:
      "Start by selecting the document you want to convert or edit. You can upload it directly from your device, or import it from cloud storage services like Google Drive, Dropbox, or OneDrive.",
    icon: <FaFileUpload />,
    gradient: "from-pink-500 to-red-500",
    color: "text-pink-500",
  },
  {
    title: "Choose Your Conversion or Editing Tool",
    description:
      "Whether you need to convert a file, merge documents, compress, or edit a PDF, select the tool that fits your needs. We support formats like Word, PDF, Excel, PowerPoint, and images.",
    icon: <FaTools />,
    gradient: "from-yellow-400 to-orange-500",
    color: "text-yellow-500",
  },
  {
    title: "Convert, Edit, or Customize",
    description:
      "Once you've chosen the tool, apply the necessary changes to your document. Convert it to your desired format, edit content, rearrange pages, add annotations, or compress the file size.",
    icon: <FaEdit />,
    gradient: "from-teal-400 to-blue-500",
    color: "text-teal-500",
  },
  {
    title: "We Keep Your Files Secure!",
    description:
      "Your privacy and file security are our top priorities. Every file you upload is encrypted and automatically deleted within 24 hours. We don’t store any backups, so your data remains exclusively yours.",
    icon: <FaShieldAlt />,
    gradient: "from-yellow-500 to-yellow-600",
    color: "text-yellow-600",
  },
  {
    title: "Compatible File Formats",
    description:
      "Whether you need to convert, merge, compress, or edit a PDF, select the tool that fits your needs. Our platform supports various formats like Word, PDF, Excel, PowerPoint, and images.",
    icon: <FaFileAlt />,
    gradient: "from-purple-500 to-indigo-500",
    color: "text-purple-500",
  },
  {
    title: "Save, Print, or Share",
    description:
      "After editing or converting, review your document and download, print, or share it. We ensure your files are processed securely and available immediately.",
    icon: <FaShare />,
    gradient: "from-blue-500 to-blue-700",
    color: "text-blue-600",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-200 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-3xl top-[-150px] left-[-150px]"></div>
        <div className="absolute w-80 h-80 bg-gradient-to-br from-pink-400 to-red-500 rounded-full blur-3xl bottom-[-100px] right-[-150px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-6">
          How It Works
        </h2>
        <p className="text-center text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Upload your file, choose the tool, make your changes, and download or
          share your document. It’s that simple!
        </p>

        {/* Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white shadow-xl rounded-lg p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 transform flex items-center space-x-8"
            >
              {/* Ribbon with Icon */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-b ${step.gradient} flex items-center justify-center text-white text-3xl rounded-l-lg transform skew-x-[-15deg]`}
              >
                <div className="transform skew-x-[15deg]">{step.icon}</div>
              </div>

              {/* Content */}
              <div className="ml-24 pl-6">
                <h3
                  className={`text-2xl font-semibold transition-colors duration-300 group-hover:text-blue-500 ${step.color}`}
                >
                  {step.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                  {step.description}
                </p>
              </div>

              {/* Hover Animation for Glow */}
              <div className="absolute inset-0 border-2 border-transparent rounded-lg hover:border-gradient-to-r from-blue-400 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;