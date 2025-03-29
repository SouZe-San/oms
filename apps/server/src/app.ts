import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import checkRoutes from "./middleware/checkRoutes";
import auth from "./routes/auth.routes";
import customer from "./routes/customer.routes";
const app = express();

//middlewares
app.use(cors());
app.use(cookieParser()); //parse the cookie
app.use(express.json()); //parse incoming JSON
app.use(checkRoutes);

app.use("/api/auth", auth);
app.use("/api/customer", customer);

// default route - health check
app.get("/", (_req, res) => {
  res.status(200).json({ msg: "hello 👋🏻, I am OMS server" });
});

export default app;
