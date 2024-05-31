import PropTypes from "prop-types";
const ButtonSecondary = ({ children }) => {
  return (
    <button className="bg-custom-secondary border hover:bg-custom-primary hover:text-white transition duration-500 border-custom-secondary  py-2 px-4 font-medium text-gray-800">
      {children}
    </button>
  );
};

ButtonSecondary.propTypes = {
  children: PropTypes.node,
};

export default ButtonSecondary;
