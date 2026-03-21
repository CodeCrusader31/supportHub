import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
    },
    priority: {
      type: String,
      required: true,
      enum: ['Low', 'Medium', 'High'],
    },
    status: {
      type: String,
      enum: ['NEW', 'INVESTIGATING', 'RESOLVED'],
      default: 'NEW',
    },

    createdBy: {
      type: String,
      default: 'Anonymous',
    },
  },
  {
    timestamps: true, 
  }
);

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;