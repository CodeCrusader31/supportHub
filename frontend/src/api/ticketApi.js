import axios from 'axios';


const BASE_URL = `${import.meta.env.VITE_API_URL}/tickets`;

export const fetchTickets = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createTicket = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

export const updateTicketStatus = async (id, status) => {
  const response = await axios.patch(`${BASE_URL}/${id}`, { status });
  return response.data;
};