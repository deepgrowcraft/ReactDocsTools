import React from "react";

const DocToPdfGuide = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-blue-100 py-16 px-4 md:px-8">
      <div className="container mx-auto">
        {/* How It Works Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-blue-900">
            Steps to Convert a Word Document to PDF for Free Online
          </h2>
          <p className="text-lg md:text-xl text-blue-700 mt-4 max-w-2xl mx-auto">
            Easily convert your Word document to a PDF to preserve its
            formatting and ensure it looks the same on any device. In just a few
            clicks, your file is ready to share or save securely.
          </p>
        </div>

        {/* Step-by-Step Process */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {/* Step 1 */}
          <div className="flex items-start p-4 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <div className="bg-blue-500 h-12 w-12 flex items-center justify-center rounded-full text-white text-xl">
              1
            </div>
            <div className="ml-6 text-blue-900">
              <p className="text-lg font-semibold">Upload your Word Document</p>
              <p className="text-gray-700 mt-2">
                Drag and drop it onto this webpage to get started.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start p-4 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <div className="bg-blue-500 h-12 w-12 flex items-center justify-center rounded-full text-white text-xl">
              2
            </div>
            <div className="ml-6 text-blue-900">
              <p className="text-lg font-semibold">Process the Document</p>
              <p className="text-gray-700 mt-2">
                Wait a few seconds for the tool to convert your Word file into a
                PDF.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start p-4 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <div className="bg-blue-500 h-12 w-12 flex items-center justify-center rounded-full text-white text-xl">
              3
            </div>
            <div className="ml-6 text-blue-900">
              <p className="text-lg font-semibold">Review and Edit</p>
              <p className="text-gray-700 mt-2">
                Make any necessary changes to the resulting PDF if required.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start p-4 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <div className="bg-blue-500 h-12 w-12 flex items-center justify-center rounded-full text-white text-xl">
              4
            </div>
            <div className="ml-6 text-blue-900">
              <p className="text-lg font-semibold">Download your PDF</p>
              <p className="text-gray-700 mt-2">
                Click the "Download" button to save your newly created PDF.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-8">
            Transform Word Files to PDF Format
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <div className="flex justify-center mb-6">
                <img
                  src="/pdfIcon/convert-icon.svg"
                  alt="Convert Icon"
                  className="h-12 w-12"
                />
              </div>
              <h4 className="text-xl font-semibold text-blue-900 mb-4">
                The Ultimate Word to PDF Converter
              </h4>
              <p className="text-gray-700">
                Converting Word documents to PDF is easy with our online tool.
                Just drag and drop your DOC or DOCX file, click "Convert," and
                get a high-quality PDF in seconds—no downloads or hassle.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <div className="flex justify-center mb-6">
                <img
                  src="/pdfIcon/benefits-icon.svg"
                  alt="Benefits Icon"
                  className="h-12 w-12"
                />
              </div>
              <h4 className="text-xl font-semibold text-blue-900 mb-4">
                The Benefits of Converting to PDF
              </h4>
              <p className="text-gray-700">
                PDFs maintain your document’s layout and style, making them
                ideal for professional presentations, reports, and polished
                documents across all devices.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <div className="flex justify-center mb-6">
                <img
                  src="/pdfIcon/convert-anywhere-icon.svg"
                  alt="Convert Anywhere Icon"
                  className="h-12 w-12"
                />
              </div>
              <h4 className="text-xl font-semibold text-blue-900 mb-4">
                Convert Anywhere, Anytime
              </h4>
              <p className="text-gray-700">
                Convert files from any device—laptop, tablet, or smartphone. Our
                online tool works seamlessly across platforms so you can convert
                files anytime, anywhere.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <div className="flex justify-center mb-6">
                <img
                  src="/pdfIcon/security-icon.svg"
                  alt="Security Icon"
                  className="h-12 w-12"
                />
              </div>
              <h4 className="text-xl font-semibold text-blue-900 mb-4">
                Safe and Secure Conversion
              </h4>
              <p className="text-gray-700">
                Your privacy is our priority. We protect your data with
                encryption and automatically delete your files shortly after
                conversion. Your documents remain confidential and secure.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <div className="flex justify-center mb-6">
                <img
                  src="/pdfIcon/fast-conversion-icon.svg"
                  alt="Fast Conversion Icon"
                  className="h-12 w-12"
                />
              </div>
              <h4 className="text-xl font-semibold text-blue-900 mb-4">
                Fast PDF Conversion, No Sign-up Required
              </h4>
              <p className="text-gray-700">
                No need to create an account or provide personal details—just
                upload your Word file and convert it to PDF in seconds.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <div className="flex justify-center mb-6">
                <img
                  src="/pdfIcon/quality-conversion-icon.svg"
                  alt="Quality Conversion Icon"
                  className="h-12 w-12"
                />
              </div>
              <h4 className="text-xl font-semibold text-blue-900 mb-4">
                Quality PDF Conversion Every Time
              </h4>
              <p className="text-gray-700">
                Our tool ensures high-quality conversions every time, retaining
                the original formatting and design of your Word document.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocToPdfGuide;
