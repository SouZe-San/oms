import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import checkRoutes from "./middleware/checkRoutes";

const app = express();

//middlewares
app.use(cors());
app.use(cookieParser()); //parse the cookie
app.use(express.json()); //parse incoming JSON
app.use(checkRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "hello from OBT server" });
});

export default app;
