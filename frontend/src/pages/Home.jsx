import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTickets } from "../features/tickets/ticketsSlice";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import List from "../components/List";

const Home = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const { data, isLoading } = useSelector((state => state.tickets));
  const { user } = useSelector((state => state.auth));
  
  


  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllTickets(page));
  }, [page]);

  return (
    <div className="mt-14 min-h-screen w-full flex flex-col items-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center flex-col w-full space-y-8">
        <div className="text-center md:text-3xl font-extrabold text-gray-900">
          How Can We Help?
        </div>
        <p className="text-center font-extrabold md:text-2xl text-gray-500">
          Please select from the options below
        </p>
        <div className="flex flex-col md:flex-row w-full gap-4 space-y-4 md:space-y-0 md:justify-center md:items-center">
          <Link
            to="/new-ticket"
            className="w-full md:w-[200px] hover:bg-black hover:text-white transition-colors duration-150 font-extrabold border flex items-center justify-center gap-4 p-2 border-black "
          >
            <FaQuestionCircle />
            <span>Create a Ticket</span>
          </Link>
          <Link
            to="/profile"
            className="w-full md:w-[200px] bg-black text-white hover:bg-white hover:text-black transition-colors duration-150 font-extrabold border flex items-center justify-center gap-4 p-2 border-black "
          >
            <FaTicketAlt />
            <span>View My Tickets</span>
          </Link>
        </div>
      </div>
      {isLoading ? (
        <Spinner />
      ) : data?.data?.length > 0 ? (
        <div className="w-full flex flex-col items-center">
          <h2 className="text-xl md:text-3xl font-extrabold self-start mb-4 mt-8 ">
            Tickets
          </h2>
          <List data={data?.data} userID={user?._id} />
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(data?.count / 30)}
            onPageChange={handlePageChange}
          />{" "}
          
        </div>
      ) : (
        <p className="text-3xl font-extrabold mb-4 mt-8 "> No Tickets Found</p>
      )}
    </div>
  );
};

export default Home;
