import PropTypes from "prop-types";
const ButtonSecondary = ({ children }) => {
  return (
    <button className="bg-custom-secondary border hover:text-custom-primary transition duration-500 border-custom-secondary  py-2 px-4 font-semibold text-gray-800">
      {children}
    </button>
  );
};

ButtonSecondary.propTypes = {
  children: PropTypes.node,
};

export default ButtonSecondary;
