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
      <footer className="bg-neutral">
        <div className="footer container border-b mx-auto px-4 p-10 text-neutral-content">
          <div className="max-w-xs">
          <div>
          <Link to={"/"} className="flex items-center gap-2">
              <HiOutlineWrenchScrewdriver className="text-3xl text-[#dd3333]" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#dd3333] to-neutral inline-block text-transparent bg-clip-text">
                FixFast
              </h2>
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
            <h6 className="footer-title text-lg">Quick Links</h6>
            {quickLinks?.map((link, index) => (
              <Link to={link.url} key={index} className="link link-hover flex items-center gap-1 hover:text-error transition duration-300 ease-in-out">
                <IoIosArrowForward/>
                {link.name}
              </Link>
            ))}
          </nav>

          {/* contact */}
          <ul>
            <h6 className="footer-title text-lg">Contact</h6>
            {contacts.map((contact, index) => (
              <li key={index} className="flex gap-3 mb-1">
                <span className="text-lg">{contact.icon}</span>
                <span>{contact.text}</span>
              </li>
            ))}
          </ul>

          <form className="max-w-xs" onClick={(e)=>{e.preventDefault()}}>
          <h6 className="footer-title text-lg">Newsletter</h6>
          <p>Subscribe our news letter to get exciting latest and updated news.</p>
          <fieldset className="form-control mt-1">
            <div className="join">
              <input
                type="text"
                placeholder="Enter Your Email"
                className="input bg-base-200 text-base-content focus:outline-none border focus:border-neutral-content join-item"
              />
              <button className="btn btn-error join-item">
              <FaArrowTrendUp className="text-xl text-base-300"/>
              </button>
            </div>
          </fieldset>
        </form>

        </div>
      </footer>

      <footer className="  bg-neutral ">
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