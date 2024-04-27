import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_BASE_URL + "/api/tickets";

const getUser =async () => {
  return await JSON.parse(localStorage.getItem("user") || "{}");
};

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
  const user = getUser();
  try {
    const response = await axios.get(userTicketsUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user tickets:", error);
    throw error;
  }
};

const createTicket = async (ticketData) => {
  const createTicketUrl = `${API_URL}`;
  const user = getUser();
  try {
    const response = await axios.post(createTicketUrl, ticketData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    toast.success("Ticket created successfully");
    return response.data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

const getTicket = async (id) => {
  const ticketUrl = `${API_URL}/${id}`;
  const user = getUser();
  try {
    const response = await axios.get(ticketUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

const updateTicket = async (ticketData) => {
  const { _id, ...data } = ticketData;
  const ticketUrl = `${API_URL}/${_id}`;
  const user = getUser();
  try {
    const response = await axios.put(ticketUrl, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

const deleteTicket = async (id) => {
  const ticketUrl = `${API_URL}/${id}`;
  const user = getUser();
  try {
    const response = await axios.delete(ticketUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

const ticketsService = {
  getAllTickets,
  createTicket,
  getUserTickets,
  getTicket,
  updateTicket,
  deleteTicket,
};
export default ticketsService;
