import PropTypes from "prop-types";
const ErrorElement = ({ errorText }) => {
  return (
    <div className="flex items-center justify-center py-12">
      <h2 className="text-gray-300 italic text-3xl font-medium">{errorText}</h2>
    </div>
  );
};

ErrorElement.propTypes = {
  errorText: PropTypes.string.isRequired,
};

export default ErrorElement;
