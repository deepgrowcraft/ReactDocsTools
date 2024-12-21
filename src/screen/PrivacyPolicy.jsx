import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen p-6 text-gray-800 bg-gray-100 md:p-10 lg:p-16">
      <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md md:p-10">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-900 md:text-4xl">
          Privacy Policy
        </h1>

        <p className="mb-4 text-sm leading-relaxed md:text-base">
          PDFSmallTools is committed to protecting your privacy. This Privacy
          Policy outlines how we collect, use, and safeguard your personal
          information when you use our website and services.
        </p>

        <h2 className="mt-6 mb-3 text-lg font-semibold text-gray-900 md:text-2xl">
          1. Information We Collect
        </h2>
        <p className="mb-4 text-sm leading-relaxed md:text-base">
          <strong>Account Information:</strong> When you sign up or log in to
          our web application, we collect personal information such as your
          name, email address, and password.
        </p>
        <p className="mb-4 text-sm leading-relaxed md:text-base">
          <strong>Usage Data:</strong> We collect data on how you use the web
          application, such as the tasks you perform and other interactions with
          the platform.
        </p>

        <h2 className="mt-6 mb-3 text-lg font-semibold text-gray-900 md:text-2xl">
          2. Use of Your Information
        </h2>
        <p className="mb-4 text-sm leading-relaxed md:text-base">
          <strong>Data Processing:</strong> The information you upload to our
          web application is processed to provide the features you use.
        </p>
        <p className="mb-4 text-sm leading-relaxed md:text-base">
          <strong>Data Retention:</strong> We do not store or retain any data
          you upload. Once the processing is complete, all uploaded data is
          automatically deleted.
        </p>
        <p className="mb-4 text-sm leading-relaxed md:text-base">
          <strong>Account Management:</strong> Your personal information is used
          to manage your account, including signing up, logging in, and
          providing access to our features.
        </p>
        <p className="mb-4 text-sm leading-relaxed md:text-base">
          <strong>Subscription & Refund Policy:</strong> If you choose to
          subscribe to our services, we will use your payment information to
          process the subscription. You may cancel your subscription at any
          time, and a refund will be issued based on our refund policy. For more
          details, please refer to our{" "}
          <a href="/refund-policy" className="text-blue-600 underline">
            Refund Policy
          </a>{" "}
          section.
        </p>

        <h2 className="mt-6 mb-3 text-lg font-semibold text-gray-900 md:text-2xl">
          3. Data Deletion
        </h2>
        <p className="mb-4 text-sm leading-relaxed md:text-base">
          <strong>Account Deletion:</strong> You can delete your account at any
          time from the account settings. When you delete your account, all your
          personal data will be permanently removed from our systems.
        </p>
        <p className="mb-4 text-sm leading-relaxed md:text-base">
          <strong>Uploaded Data:</strong> Uploaded data is not stored after
          processing and is automatically deleted once the conversion or action
          is complete. We do not save or retain any of your uploaded files.
        </p>

        <h2 className="mt-6 mb-3 text-lg font-semibold text-gray-900 md:text-2xl">
          4. Security of Your Information
        </h2>
        <p className="mb-4 text-sm leading-relaxed md:text-base">
          We use industry-standard security measures to protect the information
          you provide to us. However, no method of data transmission or storage
          can be 100% secure. While we strive to protect your personal
          information, we cannot guarantee its absolute security.
        </p>

        <h2 className="mt-6 mb-3 text-lg font-semibold text-gray-900 md:text-2xl">
          5. Third-Party Services
        </h2>
        <p className="mb-4 text-sm leading-relaxed md:text-base">
          We do not share your personal information with third-party service
          providers unless required to do so by law or to facilitate services we
          offer.
        </p>

        <h2 className="mt-6 mb-3 text-lg font-semibold text-gray-900 md:text-2xl">
          6. Cookies
        </h2>
        <p className="mb-4 text-sm leading-relaxed md:text-base">
          We may use cookies to enhance your experience on our website. Cookies
          are small files placed on your device to collect standard internet log
          information and visitor behavior information.
        </p>

        <h2 className="mt-6 mb-3 text-lg font-semibold text-gray-900 md:text-2xl">
          7. Changes to This Privacy Policy
        </h2>
        <p className="mb-4 text-sm leading-relaxed md:text-base">
          We may update this Privacy Policy from time to time. When we make
          changes, we will update the effective date at the top of this page. We
          encourage you to periodically review this page for any updates.
        </p>

        <h2 className="mt-6 mb-3 text-lg font-semibold text-gray-900 md:text-2xl">
          8. Contact Us
        </h2>
        <p className="mb-4 text-sm leading-relaxed md:text-base">
          If you have any questions or concerns about this Privacy Policy,
          please contact us at{" "}
          <a
            href="mailto:contact@pdfsmalltools.com"
            className="text-blue-600 underline"
          >
            contact@pdfsmalltools.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
