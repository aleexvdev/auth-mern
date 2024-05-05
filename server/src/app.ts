import express from 'express';
import cors from 'cors';
import connectDB from './config/database';
import helmet from 'helmet';
import morgan from 'morgan';
import AuthRouters from './routes/auth.routes'
import UserRouters from './routes/user.routes'
import { createRoles } from './libs/initialSetup';

const app = express();
// Settings
app.set("json spaces", 4);

// Middlewares
app.use(express.json());
app.use(
  cors({
    // origin: "http://localhost:3000",
  })
);
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Realiza acciones adicionales, como registrar el error, enviar una notificación, etc.
});
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.get("/", (_req, res) => {
  res.json({ 
    message: "Welcome to Auth application.",
  });
});

app.use('/api/v1/auth', AuthRouters);
app.use('/api/v1/users', UserRouters);

// Conexión a la base de datos
connectDB();
createRoles();

export default app;