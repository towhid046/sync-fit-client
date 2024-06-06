import TotalBalance from "./TotalBalance/TotalBalance";
import BalancePieChart from "./BalancePieChart/BalancePieChart";
import LatestTransaction from "./LatestTransaction/LatestTransaction";
import SectionHeader from "./../../../components/shared/SectionHeader/SectionHeader";
import useSecureData from "./../../../hooks/useSecureData";
import LoadingSpinner from "../../../components/shared/LoadingSpinner/LoadingSpinner";
import ErrorElement from "../../../components/shared/ErrorElement/ErrorElement";
import EmptyComponent from "../../../components/shared/EmptyComponent/EmptyComponent";

const Balance = () => {
  const {
    data: transactions,
    isLoading,
    isError,
    error,
  } = useSecureData(["booked-packages"], "/all-booked-packages");

  const { data: totalNewsLetter } = useSecureData(
    ["count-news-letter-subscribers"],
    "/count-news-letter-subscribers"
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorElement errorText={error} />;
  }

  if (transactions.length <= 0) {
    return <EmptyComponent emptyText={"No applicant have found yet!"} />;
  }

  const totalBalance = transactions?.reduce(
    (acc, tran) => acc + Number(tran.price),
    0
  );

  return (
    <section>
      <SectionHeader
        title="Oversee The Balance"
        description="Observer balance and latest transaction"
      />

      <div className="flex flex-col lg:flex-row items-center">
        <div className="flex-1">
          <TotalBalance total={totalBalance} />
        </div>
        <div className="flex-1">
          {/* Todo: total member will check and send instead of length its for total paid members  */}
          <BalancePieChart
            transactionsCount={transactions.length}
            totalNewsLetter={totalNewsLetter?.count}
          />
          <div className="flex items-center gap-7 justify-center">
            <div className="flex items-center gap-1 z-50">
              <span className="size-3 bg-[#FF8042]"></span>
              <small className="text-gray-500">
                Paid members: {transactions?.length}
              </small>
            </div>
            <div className="flex items-center gap-1">
              <span className="size-3 bg-[#00C49F]"></span>
              <small className="text-gray-500">
                Newsletter subscribers: {totalNewsLetter?.count}
              </small>
            </div>
          </div>
        </div>
      </div>
      <div>
        <LatestTransaction transactions={transactions} />
      </div>
    </section>
  );
};

export default Balance;
