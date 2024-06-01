import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const PageBanner = ({ title = "Page Title", link }) => {
  return (
    <section className="flex flex-col gap-3 items-center justify-center bg-custom-secondary md:py-24 py-16">
      <h2 className="md:text-5xl text-4xl font-bold">{title}</h2>
      <ul className="list-none flex justify-center gap-2">
        <li>
          <Link to={"/"}>Home</Link>
        </li>{" "}
        /
        <li>
          <Link className="text-custom-primary" to={link}>{title}</Link>
        </li>
      </ul>
    </section>
  );
};
PageBanner.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default PageBanner;
