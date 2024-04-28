import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTicket } from "../features/tickets/ticketsSlice";
import Spinner from "../components/Spinner";
import { FaApple, FaWindows } from "react-icons/fa";
import { FcAndroidOs, FcLinux } from "react-icons/fc";
import { BsGlobe2 } from "react-icons/bs";
import { useState } from "react";
import { toast } from "react-toastify";
import EditDialog from "../components/EditDialog";
import { deleteTicket } from "../features/tickets/ticketsSlice";
import { deleteObject, setClientTicket } from "../features/client/clientSlice";
import { useNavigate } from "react-router-dom";
import Badge from "../components/Badge";
const Ticket = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { ticketId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticket, isLoading } = useSelector((state) => state.tickets);
  const { user } = useSelector((state) => state.auth);
  const { clientTicket } = useSelector((state) => state.client);

  const closeModal = () => {
    setIsOpen(false);
  };
  const handleDelete = async (id) => {
    dispatch(deleteObject(id));

    dispatch(deleteTicket(id));
    navigate("/");
    toast.success("Ticket deleted successfully");
  };
  useEffect(() => {
    if (ticketId) {
      dispatch(getTicket(ticketId));
    }
  }, [ticketId]);

  useEffect(() => {
    if (ticket) {
      dispatch(setClientTicket(ticket));
    }
  }, [ticket]);

  
  return (
    <div className="min-h-screen gap-4 w-full flex flex-col mt-14 px-4 sm:px-6 lg:px-8">
      {isLoading ? (
        <Spinner />
      ) : (
        ticket && (
          <>
            <h2 className="text-3xl text-center mb-10 font-bold ">
              {clientTicket?.title}
            </h2>
            <EditDialog
              ticket={clientTicket}
              isOpen={isOpen}
              closeModal={closeModal}
            />

            <div className="text-lg font-bold mb-2 flex items-center md:w-[30%] w-full justify-between">
              <span>Ticket ID:</span>
              <span>{clientTicket?._id}</span>
            </div>
            <div className="text-lg font-bold mb-2 flex items-center w-full md:md:w-[30%]  justify-between">
              <span>Platform:</span>

              {clientTicket?.product === "android" && <FcAndroidOs size={50} />}
              {clientTicket?.product === "ios" && <FaApple size={50} />}
              {clientTicket?.product === "windows" && (
                <FaWindows color="#0078D7" size={50} />
              )}
              {clientTicket?.product === "macos" && (
                <div className="flex items-center">
                  <span className="font-bold mt-1">macOS</span>{" "}
                  <FaApple size={25} />
                </div>
              )}
              {clientTicket?.product === "linux" && <FcLinux size={50} />}
              {clientTicket?.product === "web" && <BsGlobe2 size={40} />}
            </div>

            <div className="text-lg font-bold mb-2 flex items-center md:w-[30%] w-full justify-between">
              <span>Status:</span>
              <Badge status={clientTicket?.status} />
            </div>
            <div className="text-lg font-bold mb-2 flex items-center md:w-[30%] w-full justify-between">
              <span>Created At:</span>
              <span className="text-sm md:text-lg">
                {new Date(clientTicket?.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="text-lg font-bold mb-2 flex items-center md:w-[30%] w-full justify-between">
              <span>Created By:</span>
              <span>{clientTicket?.userName}</span>
            </div>
            <div className="text-lg font-bold mb-2 flex items-center md:w-[30%] w-full justify-between">
              <span>User Email:</span>
              <span>{clientTicket?.userEmail}</span>
            </div>
            {user?._id === clientTicket?.user && (
              <div className="flex mt-4 justify-evenly flex-wrap md:w-[30%] w-full items-center">
                <button
                  className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  data-rounded="rounded-md"
                  data-primary="blue-600"
                  data-primary-reset="{}"
                  onClick={() => setIsOpen(true)}
                >
                  Edit
                </button>
                <button
                  className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-red-500 border border-red-700 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  data-rounded="rounded-md"
                  data-primary="blue-600"
                  data-primary-reset="{}"
                  onClick={() => handleDelete(clientTicket?._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </>
        )
      )}
      <div className="md:text-3xl mt-7 font-bold mb-2 flex gap-5 flex-col w-full ">
        <span>Description:</span>
        <p className="text-sm md:text-lg ">{clientTicket?.description}</p>
      </div>
    </div>
  );
};

export default Ticket;
