import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import menorRoutes from "./routes/menor.routes.js";
import publicacionRoutes from "./routes/publicaciones.routes.js";
import adminRoutes from "./routes/admin.routes.js"; // Agrega la importación de las rutas de administradores

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", menorRoutes);
app.use("/api", publicacionRoutes);
app.use("/api", adminRoutes); // Agrega las rutas de administradores

export default app;
