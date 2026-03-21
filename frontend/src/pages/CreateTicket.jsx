import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Send, FileText, AlertCircle } from 'lucide-react';

const CreateTicket = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    priority: 'Medium',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('/api/tickets', formData);
      setLoading(false);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create ticket');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] via-[#f8f9fa] to-[#f4f0ff] p-8 w-full relative overflow-y-auto">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-indigo-400/[0.08] rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-3xl mx-auto z-10 pt-4">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Create a Ticket</h1>
          <p className="text-gray-500 mt-2 font-medium">Please provide detailed information to help us resolve your issue.</p>
        </div>
        
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-10">
          {error && (
            <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 flex items-center shadow-sm">
              <AlertCircle className="w-5 h-5 mr-3 text-red-500" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              
              {/* Subject Field */}
              <div className="relative">
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                  Subject
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 font-medium text-gray-900 placeholder-gray-400"
                    placeholder="Brief description of the issue"
                  />
                </div>
              </div>

              {/* Priority Field */}
              <div className="relative">
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                  Priority level
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 font-medium text-gray-900 appearance-none cursor-pointer"
                >
                  <option value="Low">Low - Not urgent</option>
                  <option value="Medium">Medium - Needs attention soon</option>
                  <option value="High">High - Critical issue</option>
                </select>
                {/* Custom dropdown arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-0 top-7 flex items-center px-4 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                  Detailed Message
                </label>
                <textarea
                  name="message"
                  required
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 resize-none font-medium text-gray-900 placeholder-gray-400"
                  placeholder="Provide all relevant details, error messages, and steps to reproduce..."
                />
              </div>

            </div>

            <div className="flex items-center justify-end pt-6 border-t border-gray-100/80">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-3 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors mr-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="group relative inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white bg-indigo-600 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-indigo-700 hover:shadow-[0_8px_20px_rgb(99,102,241,0.3)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                <span className="relative flex items-center">
                  {loading ? 'Submitting...' : 'Submit Request'}
                  {!loading && <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
