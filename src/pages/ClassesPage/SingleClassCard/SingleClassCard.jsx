import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useAxiosPublic from "./../../../hooks/useAxiosPublic";
import LoadingSpinner from "../../../components/shared/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";
import Reveal from "./../../../components/shared/Reveal/Reveal";
import CustomHelmet from './../../../components/shared/CustomHelmet/CustomHelmet';

const SingleClassCard = ({ singleClass }) => {
  const { image, class_name, description } = singleClass;
  const [instructors, setInstructors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const loadInstructors = async () => {
      try {
        const res = await axiosPublic.get(
          `/get-class-instructors?className=${class_name}`
        );
        setInstructors(res.data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadInstructors();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Reveal>
      <div className=" bg-custom-secondary flex flex-col justify-between border shadow-sm">
        <CustomHelmet title={class_name}/>
        <figure className="relative">
          <img className="max-h-72 w-full object-cover" src={image} alt="" />
        </figure>
        <div className="space-y-4 p-5">
          <div>
            <h2 className="text-3xl font-semibold mb-2">{class_name}</h2>
            <p className="text-gray-500">{description}</p>
          </div>
          <hr className="border-custom-primary opacity-20" />
          <h2 className="text-2xl italic font-medium ">
            Trainer who took this class
          </h2>
          <div className="flex items-center gap-5">
            {instructors.length ? (
              instructors.map((instructor) => (
                <Link
                  key={instructor._id}
                  to={`/trainer-details/${instructor._id}`}
                >
                  <figure
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={instructor.name}
                    className="border-4 rounded-full border-custom-primary border-opacity-50 cursor-pointer"
                  >
                    <img
                      src={instructor.image}
                      className="w-12 h-12 rounded-full object-cover"
                      alt={instructor.name}
                    />
                  </figure>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">
                No Instructor have took this class yet!
              </p>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
};

SingleClassCard.propTypes = {
  singleClass: PropTypes.object.isRequired,
};

export default SingleClassCard;
