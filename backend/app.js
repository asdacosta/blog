import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { userRoutes } from "./routes/user.js";
import { postRoutes } from "./routes/post.js";
import { genRoutes } from "./routes/general.js";
import {
  localStrategy,
  deserialize,
  signUpValidation,
  postSignUp,
  getLogOut,
} from "./controllers/genControl.js";
import passport from "passport";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.urlencoded({ extended: false }));
app.use(express.json);
app.use(passport.session());
passport.use(localStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser(deserialize);

app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/", genRoutes);

app.get("/log-out", getLogOut);
app.post("/sign-up", signUpValidation, postSignUp);
app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Port ${PORT} ongoing!`);
});
