import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import checkRoutes from "./middleware/checkRoutes";
import auth from "./routes/auth.routes";
import customer from "./routes/customer.routes";
import inventory from "./routes/inventory.routes";
import manage from "./routes/manage.routes";
const app = express();

//middlewares
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(cookieParser()); //parse the cookie
app.use(express.json()); //parse incoming JSON
app.use(checkRoutes);

app.use("/api/auth", auth);
app.use("/api/customer", customer);
app.use("/api/inventory", inventory);
app.use("/api/manage", manage);

// default route - health check
app.get("/", (_req, res) => {
  res.status(200).json({ msg: "hello 👋🏻, I am OMS server" });
});

export default app;
