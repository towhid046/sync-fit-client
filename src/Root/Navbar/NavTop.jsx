import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { IoLogoYoutube } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdOutlineWatchLater } from "react-icons/md";

const socialIcons = [
  <FaFacebookF />,
  <RiTwitterXFill />,
  <FaLinkedin />,
  <IoLogoYoutube />,
];

const NavTop = () => {
  return (
    <nav className="container mx-auto md:flex lg:justify-between flex-col lg:flex-row px-4 py-2 items-center md:gap-4 gap-3 hidden">
      <div className="flex items-center gap-2">
        <span>
          <MdOutlineWatchLater />
        </span>
        <strong>Working Hours : </strong>
        <span>Monday - Friday, 10am - 05pm</span>
      </div>
      <div className="lg:flex hidden items-center md:gap-5 gap-2 flex-col md:flex-row">
        <p>sync123@gmail.com</p>
        <span className="hidden md:flex">|</span>
        <strong>+99 0123456677</strong>
        <span className="hidden md:flex">|</span>
        <ul className="flex items-center gap-4">
          {socialIcons.map((icon, index) => (
            <Link className="hover:text-custom-primary duration-300 transition" key={index}>{icon}</Link>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavTop;
