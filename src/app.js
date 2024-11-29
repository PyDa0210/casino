//src/app.js
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import footballRoutes from './routes/football.routes.js';
import betRoutes from './routes/bet.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import transactionRoutes from './routes/transaction.routes.js';

const app = express();

// CORS Configuración para producción y desarrollo
const allowedOrigins = process.env.NODE_ENV === 'production' ? ['https://uscoplay.netlify.app'] : ['http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Permite enviar cookies y cabeceras con el token
}));

// Middlewares globales
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/foot', footballRoutes);
app.use('/api/bets', betRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/transactions', transactionRoutes);

export default app;
