import {
  createTicketService,
  getTicketsService,
  updateTicketStatusService,
} from '../services/ticketService.js';

// @desc    Create a new ticket
// @route   POST /api/tickets
// @access  Public
export const createTicket = async (req, res) => {
  try {
    const ticket = await createTicketService(req.body);

    res.status(201).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    if (error.message === 'All fields are required') {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Get all tickets
// @route   GET /api/tickets
// @access  Public
export const getTickets = async (req, res) => {
  try {
    const result = await getTicketsService(req.query);

    res.status(200).json({
      success: true,
      count: result.tickets.length,
      data: result.tickets,
      pagination: result.pagination || null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Update ticket status
// @route   PATCH /api/tickets/:id
// @access  Public
export const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const ticket = await updateTicketStatusService(req.params.id, status);

    res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    if (error.message === 'Invalid status value') {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    if (error.message === 'Ticket not found') {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};