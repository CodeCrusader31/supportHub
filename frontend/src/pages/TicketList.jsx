import React, { useState, useEffect } from 'react';
import TicketTable from '../components/TicketTable';
import { Ticket, ListFilter } from 'lucide-react';
import { fetchTickets } from '../api/ticketApi';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [sortedTickets, setSortedTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortOption, setSortOption] = useState('recent');

  // Fetch tickets
  useEffect(() => {
    const getTickets = async () => {
      try {
        setLoading(true);
        const res = await fetchTickets();
        setTickets(res.data || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch tickets');
      } finally {
        setLoading(false);
      }
    };

    getTickets();
  }, []);

  // Sorting logic (frontend)
  useEffect(() => {
    let temp = [...tickets];

    if (sortOption === 'recent') {
      temp.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === 'oldest') {
      temp.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOption === 'priority_high') {
      const priorityMap = { High: 3, Medium: 2, Low: 1 };
      temp.sort((a, b) => priorityMap[b.priority] - priorityMap[a.priority]);
    } else if (sortOption === 'priority_low') {
      const priorityMap = { High: 3, Medium: 2, Low: 1 };
      temp.sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority]);
    }

    setSortedTickets(temp);
  }, [tickets, sortOption]);

  if (loading && tickets.length === 0) {
    return (
      <div className="flex justify-center items-center h-full min-h-screen bg-[#f8f9fa]">
        <div className="w-10 h-10 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] via-[#f8f9fa] to-[#f4f0ff] p-4 md:p-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold">All Tickets</h1>
          <p className="text-gray-500">Manage your support tickets</p>
        </div>

        {/* Sorting UI */}
        <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-xl shadow">
          <ListFilter className="w-5 h-5 text-gray-500" />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="outline-none bg-transparent"
          >
            <option value="recent">Recent</option>
            <option value="oldest">Oldest</option>
            <option value="priority_high">Priority (High → Low)</option>
            <option value="priority_low">Priority (Low → High)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {sortedTickets.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <Ticket className="mx-auto mb-2" />
          <p>No tickets found</p>
        </div>
      ) : (
        <TicketTable tickets={sortedTickets} />
      )}
    </div>
  );
};

export default TicketList;