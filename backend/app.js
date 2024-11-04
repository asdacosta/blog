import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { userRoutes } from "./routes/user.js";
import { postRoutes } from "./routes/post.js";
import { genRoutes } from "./routes/general.js";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.urlencoded({ extended: false }));
app.use(express.json);

app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/", genRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Port ${PORT} ongoing!`);
});
