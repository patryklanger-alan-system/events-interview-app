import express from "express";
import cors from "cors";
import eventRouter from "./router/event.router";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use("/events", eventRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
