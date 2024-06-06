import SectionHeader from "../../../components/shared/SectionHeader/SectionHeader";
import useSecureData from "./../../../hooks/useSecureData";
import LoadingSpinner from "./../../../components/shared/LoadingSpinner/LoadingSpinner";
import ErrorElement from "./../../../components/shared/ErrorElement/ErrorElement";
import { RiDeleteBin5Fill } from "react-icons/ri";
import swal from "sweetalert";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllTrainers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: trainers,
    isLoading,
    isError,
    error,
    refetch,
  } = useSecureData(["all-trainers"], "/trainers");

  const handleRemoveTrainer = async (id, email) => {
    swal({
      title: "Are you sure?",
      text: "Want to delete this trainer. Once delete, you won't be able to recover this action!!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const res = await axiosSecure.delete(
            `/remove-trainer/${id}?email=${email}`
          );
          if (res.data.deletedCount) {
            refetch();
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorElement errorText={error} />;
  }

  return (
    <section>
      <SectionHeader
        title={`All Trainers: ${trainers?.length}`}
        description="See all the trainers here"
      />
      <div className="overflow-x-scroll">
        <div className="">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="text-left">
                <th className="py-2 px-4 border-b">SN.</th>
                <th className="py-2 px-4 border-b">Trainer Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {trainers?.map((trainer, index) => (
                <tr
                  key={trainer._id}
                  className={`text-left ${
                    index % 2 !== 1 ? "bg-custom-secondary-light" : ""
                  }`}
                >
                  <td className="py-2 px-4 border-b">{index + 1}</td>

                  <td className="py-2 px-4 border-b">
                    <div className="flex items-center gap-2">
                      <img
                        src={trainer.image}
                        className="w-10 rounded-full h-10"
                        alt=""
                      />
                      <div>
                        <p className="font-semibold">{trainer?.name}</p>
                        <small>
                          <em>{trainer?.role}</em>
                        </small>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">{trainer?.email}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() =>
                        handleRemoveTrainer(trainer._id, trainer.email)
                      }
                    >
                      <RiDeleteBin5Fill className="text-red-400  text-2xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AllTrainers;
