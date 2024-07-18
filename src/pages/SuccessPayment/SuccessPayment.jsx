import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SuccessPayment = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const updateUserPaymentStatus = async () => {
      if (!user.email) {
        return;
      }
      try {
        const res = await axiosPublic.patch(
          "/update-booking-package-payment-status",
          { email: user.email }
        );
        if (res.data?.modifiedCount) {
          // send email to the user:
          const resp = await axiosPublic.post("/send-email", {
            email: user.email,
          });
          console.log(resp.data);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    updateUserPaymentStatus();
  }, [user?.email]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E1F8E6]">
      <div className="text-center p-6  shadow-lg bg-white max-w-sm">
        <FaCheckCircle className="text-gray-800 text-6xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800">
          Payment Successful!
        </h1>
        <p className="mt-4 text-gray-800">
          Congratulations! Your payment was successful. Thank you for booking a
          trainer with SyncFit.
        </p>
        <Link to="/">
          <button className="mt-6 bg-gray-800 text-white py-2 px-4  hover:bg-gray-900 transition duration-300">
            Go to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPayment;
