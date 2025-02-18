import express from "express";

const app = express();
app.use(express.json()); //parse incoming JSON

app.get("/", (req, res) => {
  res.status(200).json({ msg: "hello from OBT server" });
});

export default app;
