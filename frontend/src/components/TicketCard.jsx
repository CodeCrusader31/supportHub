import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';

const TicketCard = ({ ticket }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'NEW':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'INVESTIGATING':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'RESOLVED':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Link to={`/ticket/${ticket._id}`}>
      <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer h-full flex flex-col justify-between group">
        <div>
          <div className="flex justify-between items-start mb-3">
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(ticket.priority)}`}>
              {ticket.priority} Priority
            </span>
            <div className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg flex items-center shadow-sm">
                {getStatusIcon(ticket.status)}
                <span className="ml-1.5 text-xs font-semibold text-gray-700">{ticket.status}</span>
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
            {ticket.subject}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-3 mb-4">
            {ticket.message}
          </p>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 pt-3 mt-auto">
          <span>By {ticket.createdBy}</span>
          <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
};

export default TicketCard;
