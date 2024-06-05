import PropTypes from "prop-types";
const ButtonPrimary = ({ children, customClass }) => {
  return (
    <button className={`bg-custom-primary border hover:bg-gray-800 transition duration-500 py-2 px-4 font-medium text-white ${customClass}`}>
      {children}
    </button>
  );
};

ButtonPrimary.propTypes = {
  children: PropTypes.node,
  customClass: PropTypes.string,
};

export default ButtonPrimary;
