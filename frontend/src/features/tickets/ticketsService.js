import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_BASE_URL+"/api/tickets";

const getAllTickets = async (page) => {
  const allUrl = `${API_URL}/all?page=${page}`;
  try {
    const response = await axios.get(allUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching all tickets:", error);
    throw error;
  }
};

const getUserTickets = async () => {
  const userTicketsUrl = `${API_URL}`;
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  try {
    const response = await axios.get(userTicketsUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user tickets:", error);
    throw error;
  }
};

const createTicket = async (ticketData) => {
  const createTicketUtl = `${API_URL}`;
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  try {
    const response = await axios.post(createTicketUtl, ticketData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });
    toast.success("Ticket created successfully");
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};
const getTicket=async(id)=>{
  const ticketUrl = `${API_URL}/${id}`;
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  try {
    const response = await axios.get(ticketUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },

    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
}

const updateTicket=async(ticketData)=>{
  const ticketUrl = `${API_URL}/${ticketData.ticketID}`;
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  try {
    const response = await axios.put(ticketUrl, ticketData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
}

const deleteTicket=async(id)=>{
  const ticketUrl = `${API_URL}/${id}`;
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  try {
    const response = await axios.delete(ticketUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
}

const ticketsService = {
  getAllTickets,
  createTicket,
  getUserTickets,
  getTicket,
  updateTicket,
  deleteTicket
};
export default ticketsService;
