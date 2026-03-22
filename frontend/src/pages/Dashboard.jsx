import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TicketTable from '../components/TicketTable';
import { Ticket, Clock, CheckCircle2 } from 'lucide-react';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/tickets`);
        setTickets(res.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch tickets');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const getMetrics = () => {
    const total = tickets.length;
    const inProgress = tickets.filter(t => t.status === 'INVESTIGATING' || t.status === 'NEW').length;
    const resolved = tickets.filter(t => t.status === 'RESOLVED').length;
    return { total, inProgress, resolved };
  };

  const metrics = getMetrics();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-screen bg-[#f8f9fa]">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 rounded-full animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
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
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] via-[#f8f9fa] to-[#f4f0ff] p-4 md:p-8 w-full relative overflow-y-auto">
      {/* Abstract Background Elements */}
      <div className="hidden md:block absolute top-0 left-0 w-full h-[400px] bg-indigo-600/[0.03] -skew-y-3 transform origin-top-left -z-10"></div>
      <div className="hidden md:block absolute top-[-100px] right-[-100px] w-96 h-96 bg-purple-400/[0.08] rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Overview</h1>
            <p className="text-gray-500 mt-2 font-medium">Manage and monitor all your support tickets.</p>
          </div>
        </div>
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 transform transition-all">
          <div className="bg-white/60 backdrop-blur-xl border border-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(99,102,241,0.1)] transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
            <div className="flex items-center mb-4">
              <div className="p-3 bg-indigo-100/50 rounded-xl mr-4 shadow-sm border border-indigo-50 text-indigo-600">
                <Ticket className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 tracking-wide">Total Tickets</h3>
            </div>
            <p className="text-4xl font-black text-gray-900">{metrics.total}</p>
          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(245,158,11,0.1)] transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
            <div className="flex items-center mb-4">
              <div className="p-3 bg-amber-100/50 rounded-xl mr-4 shadow-sm border border-amber-50 text-amber-600">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 tracking-wide">Active</h3>
            </div>
            <p className="text-4xl font-black text-gray-900">{metrics.inProgress}</p>
          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(16,185,129,0.1)] transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
            <div className="flex items-center mb-4">
              <div className="p-3 bg-emerald-100/50 rounded-xl mr-4 shadow-sm border border-emerald-50 text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 tracking-wide">Resolved</h3>
            </div>
            <p className="text-4xl font-black text-gray-900">{metrics.resolved}</p>
          </div>
        </div>

        {/* Table Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            Recent Tickets
            <span className="ml-3 px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-bold rounded-full shadow-inner">
              {tickets.length}
            </span>
          </h2>
          {tickets.length === 0 ? (
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-6 sm:p-16 text-center text-gray-500">
              <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                <Ticket className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No tickets found</h3>
              <p>Everything is running smoothly. Create a new ticket if needed.</p>
            </div>
          ) : (
            <TicketTable tickets={tickets} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;