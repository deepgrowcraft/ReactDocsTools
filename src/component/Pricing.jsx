import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const plans = [
  {
    title: "Starter Plan",
    price: { monthly: 0, yearly: 0 },
    description: "This package is suitable for individuals or small teams.",
    features: [
      "Basic conversion tools",
      "Standard file processing speed",
      "Limited to 5 conversions per day",
    ],
    buttonText: "Select Starter Plan",
  },
  {
    title: "Basic Plan",
    price: { monthly: 499, yearly: 2999 },
    description: "This package is suitable for teams up to 50 people.",
    features: [
      "Unlimited conversions",
      "Faster processing speed",
      "Priority customer support",
      "Ad-free experience and faster performance without interruptions",
    ],
    buttonText: "Select Basic Plan",
  },
  {
    title: "Pro Plan",
    price: { monthly: 999, yearly: 5999 },
    description: "This package is suitable for medium-sized teams.",
    features: [
      "All Basic Plan features",
      "Advanced editing tools",
      "OCR text recognition",
      "Ad-free experience and faster performance without interruptions",
    ],
    buttonText: "Select Pro Plan",
  },
];

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState("Starter Plan");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [isProcessing, setIsProcessing] = useState(false); // Track if the payment is processing
  const navigate = useNavigate();

  const isAuthenticated =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken") !== null;
  const userEmail =
    localStorage.getItem("user_email") || sessionStorage.getItem("user_email");
  const userFullName =
    localStorage.getItem("user_fullname") ||
    sessionStorage.getItem("user_fullname");

  const handleSelectPlan = (planTitle) => {
    if (!isProcessing) {
      setSelectedPlan(planTitle);
    }
  };

  const handlePayment = async (plan) => {
    if (!isAuthenticated) {
      alert("You need to log in or sign up to purchase a plan.");
      navigate("/login");
      return;
    }

    if (isProcessing) {
      return; // Prevent multiple clicks
    }

    setIsProcessing(true); // Disable further clicks

    try {
      const billingName = `${plan.title} - ${
        billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)
      } Billing`;

      const response = await axios.post(`${API_URL}/create-order/`, {
        amount: plan.price[billingCycle], // Amount based on billing cycle
        currency: "INR",
        billing_name: billingName, // Updated billing name
        receipt: `receipt_${plan.title.replace(" ", "_")}`,
      });

      const { order_id, amount, currency } = response.data;

      const options = {
        key: "rzp_live_wUBIeMzGdaBOfr",
        amount: amount,
        currency: currency,
        name: "Sports AtooZ",
        description: `Payment for ${plan.title}`,
        order_id: order_id,
        handler: function (response) {
          alert("Payment Successful");
          console.log("Payment response:", response);
          setIsProcessing(false); // Re-enable the button after success
        },
        prefill: {
          name: userFullName,
          email: userEmail, // Replace with authenticated user email
          contact: "9999999999",
        },
        notes: {
          user_email: userEmail, // Replace with authenticated user email
          plan_name: plan.title,
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          // Razorpay modal close callback
          ondismiss: function () {
            alert("Payment process interrupted. Try again.");
            setIsProcessing(false); // Re-enable the button after modal is closed
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on("payment.failed", function (response) {
        alert("Payment Failed");
        console.error(response.error);
        setIsProcessing(false); // Re-enable on payment failure
      });
    } catch (error) {
      console.error("Payment Error:", error);
      setIsProcessing(false); // Re-enable on error
    }
  };

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container px-4 mx-auto text-center sm:px-6 lg:px-8">
        <h2 className="mb-6 text-3xl font-extrabold text-gray-800 sm:text-4xl lg:text-5xl">
          Flexible Pricing Plans for Everyone
        </h2>
        <p className="max-w-3xl mx-auto mb-12 text-base text-gray-600 sm:text-lg lg:text-xl">
          Choose between monthly and yearly billing options. Our plans are
          designed to cater to individuals, teams, and businesses.
        </p>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 text-sm font-medium border rounded-l-lg transition-colors duration-300 ${
              billingCycle === "monthly"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-4 py-2 text-sm font-medium border rounded-r-lg transition-colors duration-300 ${
              billingCycle === "yearly"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}
          >
            Yearly (Save 50%)
          </button>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              onClick={() => handleSelectPlan(plan.title)}
              className={`relative p-6 sm:p-8 rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:shadow-xl hover:scale-105 ${
                selectedPlan === plan.title
                  ? "bg-gradient-to-r from-blue-100 to-blue-200 border-4 border-blue-500"
                  : "bg-white"
              }`}
            >
              <h3 className="mb-4 text-xl font-semibold sm:text-2xl">
                {plan.title}
              </h3>
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
                disabled={isProcessing} // Disable button during processing
              >
                {isProcessing ? "Processing..." : plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
