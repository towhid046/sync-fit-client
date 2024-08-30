import PropTypes from "prop-types";
const SectionHeader = ({
  title = "Section Heading",
  description = "Section Description",
}) => {
  return (
    <header className="flex flex-col gap-2 items-center justify-center text-center md:py-8 py-5">
      <h2 className="md:text-4xl text-3xl font-bold uppercase text-gray-800">
        {title}
      </h2>
      <p className="text-custom-primary ">{description}</p>
    </header>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default SectionHeader;
