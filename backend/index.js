import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import ticketRoutes from './routes/ticketRoutes.js';

dotenv.config();
const app = express();

// ✅ Simple CORS (easy to explain)
app.use(
  // Use CORS_ORIGIN from env (comma-separated) or fall back to common dev origins.
  (() => {
    const raw = process.env.CORS_ORIGIN || 'http://localhost:5173';
    const allowed = raw.split(',').map(s => s.trim()).filter(Boolean);
    // Always include 127.0.0.1 variant for local testing
    if (!allowed.includes('http://127.0.0.1:5173')) allowed.push('http://127.0.0.1:5173');

    return cors({
      origin: (origin, callback) => {
        // allow non-browser tools like curl/postman (no origin)
        if (!origin) return callback(null, true);
        if (allowed.indexOf(origin) !== -1) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
  })()
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