import SectionHeader from "../../../components/shared/SectionHeader/SectionHeader";
import useSecureData from "./../../../hooks/useSecureData";
import LoadingSpinner from "./../../../components/shared/LoadingSpinner/LoadingSpinner";
import ErrorElement from "./../../../components/shared/ErrorElement/ErrorElement";
import { RiDeleteBin5Fill } from "react-icons/ri";
import swal from "sweetalert";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ButtonPrimary from "./../../../components/shared/ButtonPrimary/ButtonPrimary";
import { Link } from "react-router-dom";
import EmptyComponent from "./../../../components/shared/EmptyComponent/EmptyComponent";

const AppliedTrainers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: applicants,
    isLoading,
    isError,
    error,
    refetch,
  } = useSecureData(["applied-trainers"], "/applied-trainers");

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

  if (applicants.length <= 0) {
    return <EmptyComponent emptyText={"No applicant have found yet!"} />;
  }

  return (
    <section>
      <SectionHeader
        title={`All Applications: ${applicants?.length}`}
        description="See all the trainers here"
      />
      <div className="overflow-x-auto">
        <div className="">
          <table className="min-w-full bg-white bg-opacity-80 border border-gray-200">
            <thead>
              <tr className="text-left">
                <th className="py-2 px-4 border-b">SN.</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {applicants?.map((applicant, index) => (
                <tr
                  key={applicant._id}
                  className={`text-left ${
                    index % 2 !== 1 ? "bg-custom-secondary-light" : ""
                  }`}
                >
                  <td className="py-2 px-4 border-b">{index + 1}</td>

                  <td className="py-2 px-4 border-b">
                    <div className="flex items-center gap-2">
                      <img
                        src={applicant.image}
                        className="w-10 rounded-full h-10"
                        alt=""
                      />
                      <div>
                        <p className="font-semibold">{applicant?.name}</p>
                        <small className="text-gray-600">
                          <em>{applicant?.status}</em>
                        </small>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">{applicant?.email}</td>
                  <td className="py-2 px-4 border-b">
                    <Link
                      to={`/admin-dashboard/applied-trainer-details/${applicant._id}`}
                    >
                      <ButtonPrimary> See details</ButtonPrimary>
                    </Link>
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

export default AppliedTrainers;
