import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const CancelPayment = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E1F8E6]">
      <div className="text-center p-6 shadow-lg bg-white max-w-sm">
        <FaTimesCircle className="text-gray-800 text-6xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800">Payment Cancelled</h1>
        <p className="mt-4 text-gray-800">
          Your payment was cancelled. Please try again or contact support if you
          need assistance.
        </p>
        <Link to={"/"}>
          <button className="mt-6 bg-gray-800 text-white py-2 px-4  hover:bg-gray-900">
            Go to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CancelPayment;
