// Spinner.jsx

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-gray-800"></div>
    </div>
  );
};

export default LoadingSpinner;
