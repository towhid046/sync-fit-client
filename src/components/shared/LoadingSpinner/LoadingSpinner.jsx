import PropTypes from "prop-types";
const LoadingSpinner = ({ customClass }) => {
  return (
    <div className={`flex justify-center items-center ${customClass} `}>
      <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-gray-800"></div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  customClass: PropTypes.string,
};

export default LoadingSpinner;
