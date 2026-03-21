import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/tickets';

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