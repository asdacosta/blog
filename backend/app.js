import express from "express";
import dotenv from "dotenv";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
const prisma = new PrismaClient();
const assetsPath = path.join(__dirname, "../public/backend");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json);

app.listen(PORT, () => {
  console.log(`Port ${PORT} ongoing!`);
});
