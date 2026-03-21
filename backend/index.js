import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import ticketRoutes from './routes/ticketRoutes.js';
// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Support Ticket API is running...');
});

// Routes (we will add later)
// import ticketRoutes from './routes/ticketRoutes.js';
// app.use('/api/tickets', ticketRoutes);
app.use('/api/tickets', ticketRoutes);

// Start server only after DB connects
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // connect to MongoDB

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();