import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, AlertCircle, CheckCircle2, Calendar, User, ShieldAlert } from 'lucide-react';

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/tickets');
      const foundTicket = res.data.data.find(t => t._id === id);
      if (foundTicket) {
        setTicket(foundTicket);
      } else {
        setError('Ticket not found');
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to load ticket details');
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setUpdating(true);
      const res = await axios.patch(`/api/tickets/${id}`, { status: newStatus });
      setTicket(res.data.data);
      setUpdating(false);
    } catch (err) {
      alert('Failed to update status');
      setUpdating(false);
    }
  };

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

  if (error || !ticket) {
    return (
      <div className="p-8 bg-[#f8f9fa] min-h-screen">
        <button onClick={() => navigate('/')} className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 font-bold transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Overview
        </button>
        <div className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center text-gray-500 max-w-2xl mx-auto mt-20">
            <ShieldAlert className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
            <p className="text-lg">{error || 'Ticket not found.'}</p>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'NEW': return <AlertCircle className="w-5 h-5 text-purple-600" />;
      case 'INVESTIGATING': return <Clock className="w-5 h-5 text-amber-600" />;
      case 'RESOLVED': return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      default: return null;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'NEW': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'INVESTIGATING': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'RESOLVED': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  
  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'High': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Medium': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Low': return 'bg-sky-50 text-sky-700 border-sky-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] via-[#f8f9fa] to-[#f4f0ff] p-8 w-full relative overflow-y-auto">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/[0.04] rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-4xl mx-auto z-10 pt-2">
        <button onClick={() => navigate('/')} className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-8 transition-colors font-bold px-4 py-2 bg-white/50 backdrop-blur-md rounded-xl shadow-sm border border-white hover:shadow-md">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </button>
        
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white overflow-hidden">
          {/* Header Section */}
          <div className="p-8 md:p-10 border-b border-gray-100/80 bg-white/40">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-6">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">{ticket.subject}</h1>
              
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                 <span className={`px-4 py-1.5 text-sm font-bold rounded-full border shadow-sm ${getPriorityBadgeClass(ticket.priority)}`}>
                  {ticket.priority} Priority
                 </span>
                 <div className={`flex items-center px-4 py-1.5 border rounded-full shadow-sm font-bold text-sm ${getStatusBadgeClass(ticket.status)}`}>
                    {getStatusIcon(ticket.status)}
                    <span className="ml-2">{ticket.status}</span>
                 </div>
              </div>
            </div>
            
            <div className="flex flex-wrap text-sm text-gray-500 gap-6 mt-4">
              <div className="flex items-center bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                <User className="w-4 h-4 mr-2 text-indigo-400" />
                <span><span className="text-gray-400 mr-1">By</span><strong className="text-gray-700">{ticket.createdBy}</strong></span>
              </div>
              <div className="flex items-center bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                <Calendar className="w-4 h-4 mr-2 text-indigo-400" />
                <span><span className="text-gray-400 mr-1">Created</span><strong className="text-gray-700">{new Date(ticket.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</strong></span>
              </div>
            </div>
          </div>

          {/* Message Section */}
          <div className="p-8 md:p-10 relative">
            <div className="absolute top-10 left-10 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center -translate-x-12 hidden md:flex">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            </div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 md:ml-0">Message Content</h3>
            <div className="bg-gray-50/50 p-6 md:p-8 rounded-2xl border border-gray-200/60 text-gray-800 whitespace-pre-wrap min-h-[200px] leading-relaxed text-lg shadow-inner">
              {ticket.message}
            </div>
          </div>

          {/* Action Section */}
          <div className="p-8 md:p-10 border-t border-gray-100/80 bg-gray-50/30">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-5">Update Lifecycle</h3>
            <div className="flex flex-wrap gap-4">
              <button 
                disabled={updating || ticket.status === 'NEW'}
                onClick={() => handleStatusChange('NEW')}
                className={`flex items-center px-6 py-3 rounded-xl font-bold transition-all duration-200 ${ticket.status === 'NEW' ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-400 shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 hover:shadow-md'}`}
              >
                <AlertCircle className={`w-4 h-4 mr-2 ${ticket.status === 'NEW' ? 'text-purple-600' : 'text-gray-400'}`} />
                Mark as NEW
              </button>
              <button 
                disabled={updating || ticket.status === 'INVESTIGATING'}
                onClick={() => handleStatusChange('INVESTIGATING')}
                className={`flex items-center px-6 py-3 rounded-xl font-bold transition-all duration-200 ${ticket.status === 'INVESTIGATING' ? 'bg-amber-100 text-amber-800 ring-2 ring-amber-400 shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 hover:shadow-md'}`}
              >
                <Clock className={`w-4 h-4 mr-2 ${ticket.status === 'INVESTIGATING' ? 'text-amber-600' : 'text-gray-400'}`} />
                Mark INVESTIGATING
              </button>
              <button 
                disabled={updating || ticket.status === 'RESOLVED'}
                onClick={() => handleStatusChange('RESOLVED')}
                className={`flex items-center px-6 py-3 rounded-xl font-bold transition-all duration-200 ${ticket.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-800 ring-2 ring-emerald-400 shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 hover:shadow-md'}`}
              >
                <CheckCircle2 className={`w-4 h-4 mr-2 ${ticket.status === 'RESOLVED' ? 'text-emerald-600' : 'text-gray-400'}`} />
                Mark RESOLVED
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
