import React from "react";

const PlanCard = ({
  plan,
  billingCycle,
  selectedPlan,
  handleSelectPlan,
  handlePayment,
  isProcessing,
}) => {
  return (
    <div
      onClick={() => handleSelectPlan(plan.title)}
      className={`relative p-6 sm:p-8 rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:shadow-xl hover:scale-105 ${
        selectedPlan === plan.title
          ? "bg-gradient-to-r from-blue-100 to-blue-200 border-4 border-blue-500"
          : "bg-white"
      }`}
    >
      <h3 className="mb-4 text-xl font-semibold sm:text-2xl">{plan.title}</h3>
      <div className="mb-2 text-3xl font-bold sm:text-4xl">
        ₹{plan.price[billingCycle]}
      </div>
      <p className="mb-6 text-sm text-gray-600 sm:text-base">
        {plan.description}
      </p>
      <ul className="mb-6 space-y-2 text-sm text-gray-700 sm:text-base">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a 1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={() => handlePayment(plan)}
        className={`w-full py-2 sm:py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
          selectedPlan === plan.title
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-800 hover:bg-gray-900"
        }`}
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : plan.buttonText}
      </button>
    </div>
  );
};

export default PlanCard;
