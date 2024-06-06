
const TotalBalance = ({ total }) => {
  return (
    <div className=" text-center ">
      <div className="border-custom-primary mx-auto px-12 max-w-max border py-8 border-opacity-50">
      <h2 className="text-3xl font-semibold">Total Balance</h2>
      <p className="text-2xl text-custom-primary font-bold">${total}</p>
      </div>
    </div>
  );
};

export default TotalBalance;
