import SectionHeader from "../../../components/shared/SectionHeader/SectionHeader";
import useSecureData from "./../../../hooks/useSecureData";
import LoadingSpinner from "./../../../components/shared/LoadingSpinner/LoadingSpinner";
import ErrorElement from "./../../../components/shared/ErrorElement/ErrorElement";
import { RiDeleteBin5Fill } from "react-icons/ri";
import swal from "sweetalert";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import EmptyComponent from "./../../../components/shared/EmptyComponent/EmptyComponent";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";

const ManageSlots = () => {
  const [slots, setSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    loadData();
  }, [user?.email]);

  const loadData = async () => {
    if (!user?.email) {
      return <LoadingSpinner />;
    }
    try {
      const res = await axiosSecure.get(
        `/available-slots?email=${user?.email}`
      );
      setSlots(res?.data?.availableSlots);
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveSlot = async (slot) => {
    swal({
      title: "Are you sure?",
      text: "Want to delete this slot!!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const res = await axiosSecure.delete(
            `/remove-a-slot?email=${user?.email}&slot_name=${slot}`
          );
          if (res?.data?.modifiedCount) {
            loadData();
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

  if (slots?.length === undefined) {
    return <EmptyComponent emptyText={"No slots have found!"} />;
  }

  if (slots?.length <=0) {
    return <EmptyComponent emptyText={"No slots have found!"} />;
  }
  if (isError) {
    return <ErrorElement errorText={isError} />;
  }

  return (
    <section>
      <SectionHeader
        title={`Manage your Slots`}
        description="See all the slots you have added and booked by users"
      />

      {/* available slots */}
      <h2 className="text-2xl font-semibold text-gray-800 py-2">
        Your All Slots:
      </h2>
      <div className="overflow-x-auto">
        <div className="">
          <table className="min-w-full bg-white bg-opacity-80 border border-gray-200">
            <thead>
              <tr className="text-center">
                <th className="py-2 px-4 border-b">SN.</th>
                <th className="py-2 px-4 border-b">Slot Day</th>
                <th className="py-2 px-4 border-b">Slot Time</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {slots?.map((slot, index) => (
                <tr
                  key={slot}
                  className={`text-center ${
                    index % 2 !== 1 ? "bg-custom-secondary-light" : ""
                  }`}
                >
                  <td className="py-2 px-4 border-b">{index + 1}</td>

                  <td className="py-2 px-4 border-b">{slot.split(" ")[0]}</td>
                  <td className="py-2 px-4 border-b">
                    {slot.split(" ").slice(1, slot.split(" ").length)}
                  </td>
                  <td className="py-2 px-4 border-b flex justify-center">
                    <button onClick={() => handleRemoveSlot(slot)}>
                      <RiDeleteBin5Fill className="text-2xl text-red-400 " />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booked slots */}
      {/* <div className="overflow-x-auto">
        <div className="">
          <table className="min-w-full bg-white bg-opacity-80 border border-gray-200">
            <thead>
              <tr className="text-left">
                <th className="py-2 px-4 border-b">All Slots</th>
                <th className="py-2 px-4 border-b">Booked Slots</th>
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
      </div> */}
    </section>
  );
};

export default ManageSlots;
