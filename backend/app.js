import express from "express";
import dotenv from "dotenv";
import { userRoutes } from "./routes/user.js";
import { postRoutes } from "./routes/post.js";
import { genRoutes } from "./routes/general.js";
import {
  localStrategy,
  deserialize,
  signUpValidation,
  postSignUp,
  getLogOut,
  jwtStrategy,
  authenticateToken,
} from "./controllers/genControl.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import {
  createNewPost,
  createNewUser,
  findUniqueUserByEmail,
} from "./models/userModel.js";
import pkg from "bcryptjs";
const { hash, compare } = pkg;
import { adminRoutes } from "./routes/admin.js";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://blog-admin-6fh6.onrender.com",
      "https://blog-users-dhof.onrender.com/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(passport.initialize());

app.use("/user", authenticateToken, userRoutes);
app.use("/post", postRoutes);
app.use("/admin", adminRoutes);
app.use("/", genRoutes);

app.get("/log-out", getLogOut);
app.post("/sign-up", signUpValidation, postSignUp);
app.post("/log-in", async (req, res) => {
  const { email, pwd } = req.body;
  try {
    const user = await findUniqueUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await compare(pwd, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user.id },
      process.env.SUPABASE_JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Port ${port} ongoing!`);
});
