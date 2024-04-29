import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_BASE_URL + "/api/tickets/";

const getAllTickets = async (page) => {
  const allUrl = `${API_URL}all?page=${page}`;
  try {
    const response = await axios.get(allUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching all tickets:", error);
    throw error;
  }
};

const getUserTickets = async (token) => {;
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

const createTicket = async (ticketData, token) => {
  try {
    const response = await axios.post(API_URL, ticketData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Ticket created successfully");
    return response.data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

const getTicket = async (id, token) => {
  const ticketUrl = `${API_URL}${id}`;
  try {
    const response = await axios.get(ticketUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

const updateTicket = async (ticketData, token, id) => {
  const ticketUrl = `${API_URL}${id}`;
  try {
    const response = await axios.put(ticketUrl, ticketData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Ticket updated successfully");
    return response.data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

const deleteTicket = async (id, token) => {
  const ticketUrl = `${API_URL}${id}`;
  try {
    const response = await axios.delete(ticketUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Ticket deleted successfully");
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
