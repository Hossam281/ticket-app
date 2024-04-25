import { FaQuestionCircle, FaTicketAlt  } from "react-icons/fa";

const Home = () => {
  return (
    <div className=" mt-14 min-h-screen flex justify-center  bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className=" text-center md:text-3xl font-extrabold text-gray-900">
          How Can We Help?
        </div>
        <p className="text-center font-extrabold md:text-2xl text-gray-500">
          Please select from the options below
        </p>
        <div className=" flex flex-col md:flex-row w-full gap-4 space-y-4 md:space-y-0 md:justify-center md:items-center">
          <button className="w-full md:w-[200px] hover:bg-black hover:text-white transition-colors duration-150 font-extrabold border flex items-center justify-center gap-4 p-2 border-black ">
            <FaQuestionCircle />
            <span>Create a Ticket</span>
          </button>
          <button className="w-full md:w-[200px] bg-black text-white hover:bg-white hover:text-black transition-colors duration-150 font-extrabold border flex items-center justify-center gap-4 p-2 border-black ">
            <FaTicketAlt />
            <span>View My Tickets</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
