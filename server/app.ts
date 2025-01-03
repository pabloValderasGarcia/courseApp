import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/user-routes';
import courseRoutes from './routes/course-routes';
import { connectDB } from './config/db-config';
require('dotenv').config()

const startServer = async () => {
  // App config
  const app = express();
  app.use(cors());
  app.use(bodyParser.json()); // Use JSON
  app.use('/api/users', userRoutes); // User routes
  app.use('/api/courses', courseRoutes); // Course routes

  // DB config
  await connectDB();

  // Open port
  const PORT = 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

// App starting
startServer().catch((error) => console.error('Error starting the server:', error));