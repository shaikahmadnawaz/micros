import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(cors());

app.get("/api/products", (req, res) => {
  res.json([
    { id: 1, name: "Product A" },
    { id: 2, name: "Product B" },
  ]);
});

app.listen(PORT, () => {
  console.log(`Products Microservice running on port ${PORT}`);
});
