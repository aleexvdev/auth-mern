import express from 'express';
import cors from 'cors';
import connectDB from './config/database';
import helmet from 'helmet';
import morgan from 'morgan';
import AuthRouters from './routes/auth.routes'

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
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.get("/", (_req, res) => {
  res.json({ 
    message: "Welcome to Auth application.",
  });
});

app.use('/api/v1/auth', AuthRouters)

// Conexión a la base de datos
connectDB();

export default app;