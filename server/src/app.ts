import express from 'express';
import cors from 'cors';
import connectDB from './config/database';
import helmet from 'helmet';
import morgan from 'morgan';
import AuthRouters from './routes/auth.routes'
import UserRouters from './routes/user.routes'
import RoleRouters from './routes/role.routes'
import { createRoles } from './libs/initialSetup';
import expressListEndpoints  from "express-list-endpoints";

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
app.get('/api/v1/routes', (_req, res) => {
  res.status(200).json(expressListEndpoints(app));
});

app.use('/api/v1/auth', AuthRouters);
app.use('/api/v1/users', UserRouters);
app.use('/api/v1/roles', RoleRouters);

// Conexión a la base de datos
connectDB();
createRoles();

export default app;