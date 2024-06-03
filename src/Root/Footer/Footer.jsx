import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaXTwitter, FaLinkedin, FaArrowTrendUp } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { LuPhone } from "react-icons/lu";
import { IoMailOutline } from "react-icons/io5";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";

const Footer = () => {
  const socialIcons = [
    <FaFacebook />,
    <FaLinkedin />,
    <FaInstagram />,
    <FaXTwitter />,
  ];

  const contacts = [
    { icon: <IoMailOutline />, text: "abc123@gmail.com" },
    { icon: <LuPhone />, text: "+11 23456789123" },
    {
      icon: <FiMapPin />,
      text: "127 Midtown Manhattan, New York",
    },
  ];

  const quickLinks = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/all-services" },
    { name: "News", url: "/all-news" },
    { name: "Register", url: "/register" },
  ];

  return (
    <>
      <footer className="bg-neutral bg-gray-800 text-gray-400">
        <div className="flex justify-between gap-10 flex-col md:flex-row container mx-auto px-4 p-10 ">
          
          <div className="max-w-xs">
          <div className="mb-4">
          <Link
            to={"/"}
            className="text-custom-primary cursor-pointer font-bold text-3xl"
          >
            Sync<span className="text-custom-secondary">Fit</span>
          </Link>
          </div>
            <p>
            At FixFast: Connecting Service Providers and Consumers for Quick Solutions.
            </p>
            <ul className="mt-6 flex gap-3 text-xl items-center text-error ">
              {socialIcons.map((icon, index) => (
                <li className="cursor-pointer hover:text-base-300 transition duration-500 ease-in-out text-xl" key={index}>
                  {icon}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <nav>
            <h6 className="text-2xl font-semibold mb-4">Quick Links</h6>
            {quickLinks?.map((link, index) => (
              <Link to={link.url} key={index} className="hover:underline flex items-center gap-1 hover:text-custom-primary ">
                <IoIosArrowForward/>
                {link.name}
              </Link>
            ))}
          </nav>

          <nav>
            <h6 className="text-2xl font-semibold mb-4">Quick Links</h6>
            {quickLinks?.map((link, index) => (
              <Link to={link.url} key={index} className="link link-hover flex items-center gap-1 hover:text-error transition duration-300 ease-in-out">
                <IoIosArrowForward/>
                {link.name}
              </Link>
            ))}
          </nav>

          {/* contact */}
          <ul>
            <h6 className="text-2xl font-semibold mb-4">Contact</h6>
            {contacts.map((contact, index) => (
              <li key={index} className="flex gap-3 mb-1">
                <span className="text-lg">{contact.icon}</span>
                <span>{contact.text}</span>
              </li>
            ))}
          </ul>

        </div>
      <hr className="border-custom-primary opacity-30 container mx-auto px-4" />
      </footer>

      <footer className="  bg-gray-800 text-gray-400">
        <div className=" container md:flex-row flex-col flex justify-between  mx-auto px-4 items-center py-4 text-neutral-content text-[13px] gap-3">
          <p>Copyright &copy; 2024 - All right reserved</p>
          <ul className="flex gap-3">
            <li className="link link-hover hover:text-error transition duration-300 ease-in-out">Terms of use</li> |
            <li className="link link-hover hover:text-error transition duration-300 ease-in-out">Privacy policy</li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;