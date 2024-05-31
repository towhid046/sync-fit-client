import PropTypes from "prop-types";
const ButtonPrimary = ({ children }) => {
  return (
    <button className="bg-custom-primary border hover:text-custom-third transition duration-500 hover:border-custom-secondary py-2 px-4 font-semibold text-white">
      {children}
    </button>
  );
};

ButtonPrimary.propTypes = {
  children: PropTypes.node,
};

export default ButtonPrimary;
