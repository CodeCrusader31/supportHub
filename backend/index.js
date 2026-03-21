import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import ticketRoutes from './routes/ticketRoutes.js';

dotenv.config();
const app = express();

// ✅ Simple CORS (easy to explain)
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://support-hub-eight.vercel.app'
    ],
  })
);

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Support Ticket API is running...');
});

app.use('/api/tickets', ticketRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();