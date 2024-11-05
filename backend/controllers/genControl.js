import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Strategy as LocalStrategy } from "passport-local";
import {
  createNewUser,
  findUniqueUser,
  findUniqueUserByEmail,
} from "../models/userModel";
import { compare, hash } from "bcryptjs";
import { validationResult } from "express-validator";

const signUpValidation = [
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.")
    .isAlpha()
    .withMessage("Name must contain only letters."),
  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.")
    .isAlpha()
    .withMessage("Name must contain only letters."),
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
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 chars.")
    .matches(/\d/)
    .withMessage("Password must contain a number.")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain special char.")
    .escape(),
  body("confirm_password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("The passwords don't match.");
    }
    return true;
  }),
];

const postSignUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.json(req.body);

  try {
    hash(req.body.password, 10, async (errors, hashedPwd) => {
      if (err) return next(err);
    });
    const user = await createNewUser(req.body.email, hashedPwd);
    return res.json(user);
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

export { localStrategy, deserialize, signUpValidation, postSignUp, getLogOut };
