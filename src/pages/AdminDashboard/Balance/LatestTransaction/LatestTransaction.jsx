import { Link } from "react-router-dom";
import ButtonPrimary from "./../../../../components/shared/ButtonPrimary/ButtonPrimary";

import PropTypes, { object } from "prop-types";

const LatestTransaction = ({ transactions }) => {
  return (
    <section className="mt-5">
      <h2 className="text-3xl font-semibold mb-3 text-gray-700 italic">
        Latest Transaction
      </h2>
      <div className="overflow-x-auto">
        <div className="">
          <table className="min-w-full bg-white bg-opacity-80 border border-gray-200">
            <thead>
              <tr className="text-center">
                <th className="py-2 px-4 border-b">Trainer Name</th>
                <th className="py-2 px-4 border-b">User Name</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Package Name</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.slice((transactions.length - 6), transactions.length).reverse().map((transaction, index) => (
                <tr
                  key={transaction._id}
                  className={`text-center ${
                    index % 2 !== 1 ? "bg-custom-secondary-light" : ""
                  }`}
                >
                  <td className="py-2 px-4 border-b">
                    {transaction.trainerName}
                  </td>

                  <td className="py-2 px-4 border-b">{transaction.userName}</td>
                  <td className="py-2 px-4 border-b">$ {transaction?.price}</td>
                  <td
                    className={`
                    ${transaction.packageName === "Premium Membership" &&"text-green-600"} 
                    ${transaction.packageName === "Standard Membership" &&"text-custom-primary"} 
                    ${transaction.packageName === "Premium Membership" &&"text-gray-400"} 
                    py-2 px-4 border-b`}
                  >
                    {transaction?.packageName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

LatestTransaction.propTypes = {
  transactions: PropTypes.arrayOf(object).isRequired,
};

export default LatestTransaction;
