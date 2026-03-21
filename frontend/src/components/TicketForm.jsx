import React, { useState } from 'react';

const TicketForm = () => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    priority: 'Low',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form Data:', formData); // for now just log
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Create Ticket</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Subject */}
        <input
          type="text"
          name="subject"
          placeholder="Enter subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Message */}
        <textarea
          name="message"
          placeholder="Enter message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Priority */}
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Ticket
        </button>

      </form>
    </div>
  );
};

export default TicketForm;