import PropTypes from "prop-types";
import { HashLoader } from "react-spinners";
const LoadingSpinner = ({ customClass }) => {
  return (
    <div className={`flex justify-center items-center ${customClass} `}>
      <HashLoader
        color={"#1F2937"}
        size={45 }
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

LoadingSpinner.propTypes = {
  customClass: PropTypes.string,
};

export default LoadingSpinner;
