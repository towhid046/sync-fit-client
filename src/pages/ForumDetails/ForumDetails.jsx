import { Link, useLoaderData } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import { useEffect } from "react";
import { scrollToTop } from "./../../utilities/scrollToTop";
import { HiMiniArrowUpLeft } from "react-icons/hi2";
import CustomHelmet from './../../components/shared/CustomHelmet/CustomHelmet';

const ForumDetails = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  const singleNews = useLoaderData();
  const { thumbnail_img, title, release_date, description, author } =
    singleNews;

  return (
    <section className="mb-16">
      <CustomHelmet title={title}/>
      <SectionHeader
        title={title.split(" ").splice(0, 3).join(" ")}
        description={description?.split(" ").splice(0, 5).join(" ")}
      />
      <div className="max-w-3xl mx-auto">
        <div className="border justify-between flex flex-col">
          <figure className="relative overflow-hidden">
            <img
              className="max-h-80 w-full object-cover"
              src={thumbnail_img}
              alt="News Image"
            />
          </figure>
          <div className="p-5">
            <div className=" space-y-4">
              <ul className="flex flex-wrap gap-4 justify-between items-start">
                <li className="flex items-center gap-2">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={author?.image}
                    alt=""
                  />
                  <div>
                    <span className="text- font-semibold text-md">
                      {author?.name}
                    </span>
                    <p>
                      <em>
                        <small className="text-gray-400">Germany</small>
                      </em>
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <CiCalendar className="text-custom-primary text-xl" />
                  <small className="text-gray-400">{release_date}</small>
                </li>
              </ul>
              <hr className="border-custom-primary opacity-20" />
              <h2 className="text-2xl font-semibold mb-2">{title}</h2>
              <p className="text-gray-600">{description}</p>
            </div>
            <div className="mt-5 flex justify-end">
              <Link to={"/"} className="flex justify-center">
                <button className=" underline text-custom-primary font-semibold flex items-center ">
                  <HiMiniArrowUpLeft className="text-xl" />
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForumDetails;
