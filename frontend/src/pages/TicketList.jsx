import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TicketTable from '../components/TicketTable';
import { Ticket, ChevronLeft, ChevronRight, ListFilter } from 'lucide-react';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/tickets?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`);
        setTickets(res.data.data || []);
        if (res.data.pagination) {
          setPagination(res.data.pagination);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch tickets');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [page, limit, sortBy, order]);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setPage(1);
    if (value === 'recent') {
      setSortBy('createdAt');
      setOrder('desc');
    } else if (value === 'oldest') {
      setSortBy('createdAt');
      setOrder('asc');
    } else if (value === 'priority_high') {
      setSortBy('priority');
      setOrder('desc'); // High(3) to Low(1)
    } else if (value === 'priority_low') {
      setSortBy('priority');
      setOrder('asc'); // Low(1) to High(3)
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < pagination.pages) {
      setPage(page + 1);
    }
  };

  if (loading && tickets.length === 0) {
    return (
      <div className="flex justify-center items-center h-full min-h-screen bg-[#f8f9fa]">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 rounded-full animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error && tickets.length === 0) {
    return (
      <div className="flex justify-center items-center h-full min-h-screen bg-[#f8f9fa] p-8">
        <div className="bg-red-50 text-red-700 px-6 py-4 rounded-xl shadow-sm border border-red-100 flex items-center">
           <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
           {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] via-[#f8f9fa] to-[#f4f0ff] p-8 w-full relative overflow-y-auto">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-indigo-600/[0.03] -skew-y-3 transform origin-top-left -z-10"></div>
      
      <div className="max-w-7xl mx-auto z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">All Tickets</h1>
            <p className="text-gray-500 mt-2 font-medium">Browse and manage your complete ticket history.</p>
          </div>
          
          <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-md px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
            <ListFilter className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-semibold text-gray-600">Sort by:</span>
            <select 
              className="bg-transparent border-none text-sm font-bold text-indigo-700 focus:ring-0 cursor-pointer outline-none"
              onChange={handleSortChange}
              defaultValue="recent"
            >
              <option value="recent">Recent</option>
              <option value="oldest">Oldest</option>
              <option value="priority_high">Priority (High to Low)</option>
              <option value="priority_low">Priority (Low to High)</option>
            </select>
          </div>
        </div>
        
        {/* Table Section */}
        <div className="relative">
          {loading && (
             <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex justify-center items-center rounded-2xl">
                <div className="w-8 h-8 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
             </div>
          )}
          
          {tickets.length === 0 && !loading ? (
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-16 text-center text-gray-500">
              <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                <Ticket className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No tickets found</h3>
              <p>Everything is clear. Create a new ticket if needed.</p>
            </div>
          ) : (
            <TicketTable tickets={tickets} />
          )}
        </div>

        {/* Pagination Controls */}
        {pagination.pages > 1 && (
          <div className="mt-8 flex items-center justify-between bg-white/60 backdrop-blur-md p-4 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-600 font-medium">
              Showing page <span className="font-bold text-gray-900">{pagination.page}</span> of <span className="font-bold text-gray-900">{pagination.pages}</span> <span className="text-gray-400">({pagination.total} total)</span>
            </p>
            
            <div className="flex space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className={`p-2 rounded-lg flex items-center transition-colors ${page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-white hover:text-indigo-600 shadow-sm'}`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextPage}
                disabled={page === pagination.pages}
                className={`p-2 rounded-lg flex items-center transition-colors ${page === pagination.pages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-white hover:text-indigo-600 shadow-sm'}`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketList;
