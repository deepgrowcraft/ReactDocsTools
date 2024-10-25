// import React from "react";

// const DocToPdf = () => {
//   return (
//     <section className="bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 py-16 px-4 mt-5">
//       <div className="container mx-auto text-center">
//         {/* Heading */}
//         <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
//           Convert Word to PDF
//         </h1>
//         <p className="text-lg md:text-xl mb-10 text-gray-700 max-w-3xl mx-auto">
//           This tool makes converting Word to PDF easy. Transform your DOC or
//           DOCX files into the widely-used PDF format online.
//         </p>

//         {/* Upload Area */}
//         <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl mx-auto transition-all duration-300 ease-in-out transform hover:scale-105">
//           {/* Upload Cloud Icon */}
//           <div
//             className="relative bg-cover bg-center mb-4"
//             style={{
//               backgroundImage: "url('/home/doctoPdfBg.svg')", // Update the path if needed
//               backgroundSize: "contain", // Makes the background image fully visible
//               backgroundRepeat: "no-repeat", // Ensures the image doesn't repeat
//               backgroundPosition: "center", // Centers the image
//               width: "100%", // Full width of the container
//               height: "150px", // Adjust height as needed
//             }}
//           >
//             <div className="flex justify-center">
//               <img
//                 src="/home/doctopdf1.svg"
//                 alt="Upload Icon"
//                 className="h-24 w-24"
//               />
//             </div>
//             <p className="text-gray-700 mb-4">Drag & Drop file here or</p>
//           </div>

//           {/* File Select Button */}
//           <div className="relative">
//             <button className="bg-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out shadow-lg w-full">
//               <img
//                 src="/home/addFile.svg"
//                 alt="addFile Icon"
//                 className="h-4 w-5"
//               />
//               Select Files
//             </button>
//             <input
//               type="file"
//               className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
//               aria-label="File Upload"
//             />
//           </div>
//         </div>

//         {/* Free Trial Section */}
//         <div className="mt-12">
//           <a
//             href="#trial"
//             className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold px-10 py-4 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
//           >
//             Get 14 Days Free Trial
//           </a>
//           <p className="mt-4 text-sm text-gray-600">
//             No Credit Card Required. Cancel Anytime.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DocToPdf;

import React from "react";

const DocToPdf = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 py-16 px-4 mt-5">
      <div className="container mx-auto text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
          Convert Word to PDF
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-700 max-w-3xl mx-auto">
          This tool makes converting Word to PDF easy. Transform your DOC or
          DOCX files into the widely-used PDF format online.
        </p>

        {/* Upload Area */}
        <div className="bg-white shadow-xl rounded-3xl p-8 max-w-xl mx-auto transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
          {/* Upload Cloud Icon */}
          <div
            className="relative bg-cover bg-center mb-6 rounded-xl overflow-hidden"
            style={{
              backgroundImage: "url('/home/doctoPdfBg.svg')", // Update the path if needed
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "200px", // Adjust height as needed
            }}
          >
            <div className="flex justify-center items-center h-full">
              <img
                src="/home/doctopdf1.svg"
                alt="Upload Icon"
                className="h-20 w-22"
              />
            </div>
          </div>

          <p className="text-gray-600 text-lg mb-4">Drag & Drop file here or</p>

          {/* File Select Button */}
          <div className="relative group">
            <button className="w-full bg-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition duration-300 ease-in-out shadow-lg flex items-center justify-center space-x-2">
              <img
                src="/home/addFile.svg"
                alt="addFile Icon"
                className="h-5 w-5"
              />
              <span>Select Files</span>
            </button>
            <input
              type="file"
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              aria-label="File Upload"
            />
          </div>
        </div>

        {/* Free Trial Section */}
        <div className="mt-12">
          <a
            href="#trial"
            className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold px-10 py-4 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Get 14 Days Free Trial
          </a>
          <p className="mt-4 text-sm text-gray-600">
            No Credit Card Required. Cancel Anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DocToPdf;
