import express from "express";
import checkRoutes from "./middleware/checkRoutes";

const app = express();
app.use(express.json()); //parse incoming JSON

app.use(checkRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "hello from OBT server" });
});

export default app;
