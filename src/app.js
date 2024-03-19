import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Importa el módulo CORS

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import menorRoutes from "./routes/menor.routes.js";
import publicacionRoutes from "./routes/publicaciones.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

// Configura CORS primero
app.use(cors()); // Esto permite solicitudes desde cualquier origen

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", menorRoutes);
app.use("/api", publicacionRoutes);
app.use("/api", adminRoutes);

export default app;
