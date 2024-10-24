import React, { useState } from "react";

const plans = [
  {
    title: "Starter Plan",
    price: "$0",
    period: "/ Per Month",
    description: "This package is suitable for teams 1-15 people",
    features: [
      "Basic conversion tools",
      "Standard file processing speed",
      "Limited to 5 conversions per day",
      "24-hour file storage",
    ],
    buttonText: "Select Starter Plan",
  },
  {
    title: "Basic Plan",
    price: "$5",
    period: "/ Per Month",
    description: "This package is suitable for teams 1-50 people",
    features: [
      "Unlimited conversions",
      "Faster processing speed",
      "Priority customer support",
      "7-day file storage",
    ],
    buttonText: "Select Basic Plan",
  },
  {
    title: "Pro Plan",
    price: "$10",
    period: "/ Per Month",
    description: "This package is suitable for teams 1-100 people",
    features: [
      "All Basic Plan features",
      "Advanced editing tools",
      "OCR text recognition",
      "30-day file storage",
    ],
    buttonText: "Select Pro Plan",
  },
  {
    title: "Business Plan",
    price: "$25",
    period: "/ Per Month",
    description: "This package is suitable for big teams or companies",
    features: [
      "All Pro Plan features",
      "Team collaboration tools",
      "Batch processing for multiple files",
      "Customizable watermarks and branding",
      "60-day file storage",
    ],
    buttonText: "Select Business Plan",
  },
];

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState("Pro Plan"); // Default selected plan

  const handleSelectPlan = (planTitle) => {
    setSelectedPlan(planTitle);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-200 relative overflow-hidden">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          We offer great price plans for the application
        </h2>
        <p className="text-gray-600 text-base md:text-lg mb-12 max-w-3xl mx-auto">
          Explore our flexible pricing options to find the perfect plan for your
          needs. Enjoy basic features for free or upgrade to a premium plan for
          enhanced tools, faster processing, and additional storage.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white p-6 sm:p-8 rounded-lg shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-105 ${
                selectedPlan === plan.title
                  ? "bg-blue-100 border-4 border-blue-500"
                  : "bg-white"
              }`}
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                {plan.title}
              </h3>
              <div className="text-3xl sm:text-4xl font-bold mb-1">
                {plan.price}
                <span className="text-lg font-medium">{plan.period}</span>
              </div>
              <p className="text-gray-600 text-sm sm:text-base mb-4">
                {plan.description}
              </p>

              <ul className="text-gray-700 mb-6 space-y-2 text-sm sm:text-base">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan.title)}
                className={`w-full py-2 sm:py-3 rounded-lg font-semibold text-white transition-colors duration-300 ${
                  selectedPlan === plan.title
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-800 hover:bg-gray-900"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
