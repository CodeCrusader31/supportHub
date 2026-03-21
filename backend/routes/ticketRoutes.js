import express from 'express';
import {
  createTicket,
  getTickets,
  updateTicketStatus,
} from '../controllers/ticketController.js';

const router = express.Router();

router.post('/', createTicket);

router.get('/', getTickets);

router.patch('/:id', updateTicketStatus);

export default router;