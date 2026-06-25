import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./app/lib/db";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
connectDB();
// app.use('/api/tasks', );

app.get("/", (_req, res) => {
  res.send("todo server is running");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});
