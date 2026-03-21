import express from 'express';
import {
  createTicket,
  getTickets,
  updateTicketStatus,
} from '../controllers/ticketController.js';

const router = express.Router();

// Create Ticket
router.post('/', createTicket);

// Get All Tickets
router.get('/', getTickets);

// Update Ticket Status
router.patch('/:id', updateTicketStatus);

export default router;