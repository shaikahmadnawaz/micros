import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(cors());

app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ]);
});

app.listen(PORT, () => {
  console.log(`Users Microservice running on port ${PORT}`);
});
