import PropTypes from "prop-types";
const EmptyComponent = ({ emptyText = "Empty!!" }) => {
  return (
    <section className="min-h-screen flex items-center justify-center text-center">
      <h1 className="text-center text-gray-400 italic lg:text-4xl md:text-3xl text-2xl font-medium">
        {emptyText}
      </h1>
    </section>
  );
};

EmptyComponent.propTypes = {
  emptyText: PropTypes.string,
};

export default EmptyComponent;
