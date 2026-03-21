import Ticket from '../models/ticket.js';

export const createTicketService = async (ticketData) => {
  const { subject, message, priority } = ticketData;


  if (!subject || !message || !priority) {
    throw new Error('All fields are required');
  }

 
  const ticket = await Ticket.create({
    subject,
    message,
    priority,
  });

  return ticket;
};

export const getTicketsService = async (query = {}) => {
  const { page, limit, sortBy, order } = query;

  if (page) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const total = await Ticket.countDocuments();
    let tickets;

    if (sortBy === 'priority') {
      const sortOrder = order === 'asc' ? 1 : -1;
      tickets = await Ticket.aggregate([
        {
          $addFields: {
            priorityWeight: {
              $switch: {
                branches: [
                  { case: { $eq: ["$priority", "Low"] }, then: 1 },
                  { case: { $eq: ["$priority", "Medium"] }, then: 2 },
                  { case: { $eq: ["$priority", "High"] }, then: 3 }
                ],
                default: 0
              }
            }
          }
        },
        { $sort: { priorityWeight: sortOrder, createdAt: -1 } },
        { $skip: skip },
        { $limit: limitNumber },
        { $project: { priorityWeight: 0 } }
      ]);
    } else {
      let sortCriteria = { createdAt: -1 };
      if (sortBy) {
         sortCriteria = { [sortBy]: order === 'asc' ? 1 : -1 };
      }
      tickets = await Ticket.find().sort(sortCriteria).skip(skip).limit(limitNumber);
    }

    return {
      tickets,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / limitNumber),
      },
    };
  }

 
  let sortCriteria = { createdAt: -1 };
  if (sortBy) {
     sortCriteria = { [sortBy]: order === 'asc' ? 1 : -1 };
  }
  const tickets = await Ticket.find().sort(sortCriteria);
  return { tickets };
};

export const updateTicketStatusService = async (id, status) => {

  const validStatuses = ['NEW', 'INVESTIGATING', 'RESOLVED'];
  if (!validStatuses.includes(status)) {
    throw new Error('Invalid status value');
  }

  const ticket = await Ticket.findByIdAndUpdate(
    id,
    { status },
    { new: true } 
  );

  if (!ticket) {
    throw new Error('Ticket not found');
  }

  return ticket;
};
