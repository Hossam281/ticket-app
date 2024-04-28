import { FaApple, FaWindows, FaTrash, FaEdit } from "react-icons/fa";
import { FcAndroidOs, FcLinux } from "react-icons/fc";
import { BsGlobe2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import EditDialog from "./EditDialog";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { deleteTicket } from "../features/tickets/ticketsSlice";
import { deleteObject } from "../features/client/clientSlice";

const TicketCard = ({ ticket, userID }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  let statusColor = "";
  switch (ticket.status) {
    case "new":
      statusColor = "text-green-500";
      break;
    case "open":
      statusColor = "text-blue-500";
      break;
    case "closed":
      statusColor = "text-red-500";
      break;
    default:
      statusColor = "text-black";
      break;
  }
  const closeModal = () => {
    setIsOpen(false);
  }
  const handleEdit = () => {
    setIsOpen(true);
  }
  const handleDelete =  (id) => {
    dispatch(deleteTicket(id));
    dispatch(deleteObject(id));
    toast.success("Ticket deleted successfully");
  }
  
  return (
    <div
      key={ticket._id}
      className="bg-white border border-gray-200 shadow-md rounded-lg p-4 flex flex-col items-center justify-center"
      style={{ maxWidth: "400px" }} // Set max-width to limit card width
    >
      <div className="text-lg font-bold mb-2 overflow-hidden">
        {ticket.title}
      </div>
      <div className="text-lg font-bold mb-2 flex items-center w-full justify-between">
        <span>Platform:</span>
        {ticket.product === "android" && <FcAndroidOs size={50} />}
        {ticket.product === "ios" && <FaApple size={50} />}
        {ticket.product === "windows" && (
          <FaWindows color="#0078D7" size={50} />
        )}
        {ticket.product === "macos" && (
          <div className="flex items-center">
            <span className="font-bold mt-1">macOS</span> <FaApple size={25} />
          </div>
        )}
        {ticket.product === "linux" && <FcLinux size={50} />}
        {ticket.product === "web" && <BsGlobe2 size={40} />}
      </div>

      <div className="text-lg font-bold mb-2 flex items-center w-full justify-between">
        <span>Status:</span>
        <span className={statusColor}>{ticket.status}</span>
      </div>
      
      <div className="text-lg font-bold mb-2 flex items-center w-full justify-between">
        <span>Created By:</span>
        {ticket.user===userID?"Me":ticket.userName}
      </div>
      <div className="flex mt-4 justify-evenly flex-wrap w-full items-center">
        {userID === ticket.user && (
          <>
            <button onClick={ () => handleDelete(ticket._id)}>
              <FaTrash  size={20} color="red" />
            </button>
            <button onClick={handleEdit}>
              <FaEdit color=" black" size={20} />
            </button>
          </>
        )}{" "}
        <Link
          to={`/tickets/${ticket._id}`}
          className="relative inline-flex items-center px-4 md:px-6 py-2 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-50 transition-colors"
        >
          <span className="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>

          <span className="relative text-xs md:text-lg">Review Ticket</span>
        </Link>
      </div>
      <EditDialog  ticket={ticket} isOpen={isOpen} closeModal={closeModal}/>
    </div>
  );
};

export default TicketCard;
