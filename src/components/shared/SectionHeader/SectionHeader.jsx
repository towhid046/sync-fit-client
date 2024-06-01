import PropTypes from "prop-types";
const SectionHeader = ({
  title = "Section Heading",
  description = "Section Description",
}) => {
  return (
    <header className="flex flex-col gap-3 items-center justify-center bg-custom-secondary-light md:py-8 py-5 text-center">
      <h2 className="md:text-4xl text-3xl font-bold uppercase">{title}</h2>
      <p className="text-custom-primary ">{description}</p>
    </header>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default SectionHeader;
