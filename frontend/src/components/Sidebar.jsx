import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Ticket, PlusCircle, LayoutDashboard, LifeBuoy, ListOrdered } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, [location, setIsOpen]);

  const isActive = (path) => {
    return location.pathname === path 
      ? 'bg-indigo-600/10 text-indigo-700 font-semibold shadow-[set_0_0_0_1px_rgba(79,70,229,0.1)]' 
      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium';
  };

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed md:relative inset-y-0 left-0 z-50
        flex flex-col w-72 h-screen px-6 py-8 
        bg-white/90 backdrop-blur-xl border-r border-gray-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)]
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex items-center mb-10 px-2 mt-2 md:mt-0">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg mr-3 shadow-indigo-500/30 shrink-0">
            <LifeBuoy className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">SupportHub<span className="text-indigo-600">.</span></h2>
        </div>

        <div className="flex flex-col flex-1 mt-4 overflow-y-auto w-full">
          <span className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Menu</span>
          <nav className="space-y-1.5 w-full">
            <Link
              to="/"
              className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group w-full ${isActive('/')}`}
            >
              <LayoutDashboard className={`shrink-0 w-5 h-5 mr-3 transition-colors ${location.pathname === '/' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
              <span>Overview</span>
            </Link>

            <Link
              to="/tickets"
              className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group w-full ${isActive('/tickets')}`}
            >
              <ListOrdered className={`shrink-0 w-5 h-5 mr-3 transition-colors ${location.pathname === '/tickets' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
              <span>Ticket List</span>
            </Link>

            <Link
              to="/create"
              className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group w-full ${isActive('/create')}`}
            >
              <PlusCircle className={`shrink-0 w-5 h-5 mr-3 transition-colors ${location.pathname === '/create' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
              <span>New Ticket</span>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
