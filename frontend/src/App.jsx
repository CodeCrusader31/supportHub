import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import CreateTicket from './pages/CreateTicket';
import TicketDetail from './pages/TicketDetail';
import TicketList from './pages/TicketList';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
        <Sidebar />
        
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tickets" element={<TicketList />} />
              <Route path="/create" element={<CreateTicket />} />
              <Route path="/ticket/:id" element={<TicketDetail />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;