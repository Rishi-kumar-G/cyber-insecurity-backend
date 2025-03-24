import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes";
import accountRoutes from "./routes/accountRoutes";

const app: Application = express();
const FRONTEND_URL = process.env.FRONTEND_URL
const SECRET_KEY = process.env.SECRET_KEY


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api", userRoutes);
app.use("/api", accountRoutes);

// New Hello World Route
app.get("/", (req: Request, res: Response) => {
  res.json({"msg":"Hello World"});
});

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

export default app;
