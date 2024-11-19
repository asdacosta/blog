import { PrismaClient } from "@prisma/client";
import {
  createNewUser,
  findUniqueUser,
  findUniqueUserByEmail,
} from "../models/userModel.js";
import pkg from "bcryptjs";
import { validationResult, body } from "express-validator";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const { compare, hash } = pkg;
dotenv.config();
const prisma = new PrismaClient();
const signUpValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Kindly enter a valid email.")
    .custom(async (value) => {
      const user = await prisma.user.findUnique({ where: { email: value } });
      if (user) throw new Error("Email already in use.");
      return true;
    })
    .normalizeEmail(),
  body("pwd")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 chars.")
    .matches(/\d/)
    .withMessage("Password must contain a number.")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain special char.")
    .escape(),
  body("pwd-confirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("The passwords don't match.");
    }
    return true;
  }),
];

const postSignUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, pwd } = req.body;
    const existingUser = await findUniqueUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    hash(pwd, 10, async (error, hashedPwd) => {
      if (error) return next(error);
      const user = await createNewUser(email, hashedPwd);
      console.log("Created? : ", user);
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      return res
        .status(201)
        .json({ message: "User created successfully", token });
    });
  } catch (error) {
    return next(error);
  }
};

const getLogOut = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SUPABASE_JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(options, async (jwtPayLoad, done) => {
  try {
    const user = await findUniqueUserByEmail(email);
    if (user) return done(null, user);
    if (!user) return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});

const localStrategy = new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
      const user = await findUniqueUserByEmail(email);
      if (!user) return done(null, false, { message: "Incorrect username" });
      const match = await compare(password, user.password);
      if (!match) return done(null, false, { message: "Incorrect password" });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

const deserialize = async (user, done) => {
  try {
    const foundUser = await findUniqueUser(user.id);
    if (!foundUser) return done(null, false);
    done(null, foundUser);
  } catch (error) {
    done(error);
  }
};

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.sendStatus(403);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403).json({ message: "Forbidden" });
    req.user = user;
    next();
  });
};

export {
  localStrategy,
  deserialize,
  signUpValidation,
  postSignUp,
  getLogOut,
  jwtStrategy,
  authenticateToken,
};
