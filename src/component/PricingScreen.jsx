import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PlanCard from "./Pancard";
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
      "24-hour file storage",
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
      "7-day file storage",
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
      "30-day file storage",
    ],
    buttonText: "Select Pro Plan",
  },
];

const PricingScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState("Starter Plan");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [isProcessing, setIsProcessing] = useState(false);
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
      return;
    }

    setIsProcessing(true);

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
        key: "rzp_test_UDwqfBdYptKoRk",
        amount: amount,
        currency: currency,
        name: "Sports AtooZ",
        description: `Payment for ${plan.title}`,
        order_id: order_id,
        handler: function (response) {
          alert("Payment Successful");
          console.log("Payment response:", response);
          setIsProcessing(false);
        },
        prefill: {
          name: userFullName,
          email: userEmail,
          contact: "9999999999",
        },
        notes: {
          user_email: userEmail,
          plan_name: plan.title,
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: function () {
            alert("Payment process interrupted. Try again.");
            setIsProcessing(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on("payment.failed", function (response) {
        alert("Payment Failed");
        console.error(response.error);
        setIsProcessing(false);
      });
    } catch (error) {
      console.error("Payment Error:", error);
      setIsProcessing(false);
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
            <PlanCard
              key={index}
              plan={plan}
              billingCycle={billingCycle}
              selectedPlan={selectedPlan}
              handleSelectPlan={handleSelectPlan}
              handlePayment={handlePayment}
              isProcessing={isProcessing}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingScreen;
