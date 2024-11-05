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
} from "./controllers/genControl.js";
import passport from "passport";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.session());

passport.use(localStrategy);
passport.use(jwtStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser(deserialize);

app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/", genRoutes);

app.get("/log-out", getLogOut);
app.post("/sign-up", signUpValidation, postSignUp);
app.post(
  "/log-in",
  passport.authenticate("local", { session: false }, (req, res) => {
    const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.json({ message: "Login successful", token });
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Port ${PORT} ongoing!`);
});
