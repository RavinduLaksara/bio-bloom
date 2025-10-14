import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";

// Generate OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

// Sign Up
export async function createUser(req, res) {
  try {
    const newUserData = req.body;

    // check already sign in
    const exitingUser = await User.findOne({ email: newUserData.email });
    if (exitingUser) {
      res.status(409).json({ message: "Already Sign Up. Please login..." });
      return;
    }

    // passward salt & hash
    const salt = await bcrypt.genSalt(10);
    newUserData.password = await bcrypt.hash(newUserData.password, salt);

    // generate otp
    newUserData.otp = generateOtp();

    // create new user
    const newUser = new User(newUserData);

    // send otp email
    sgMail.setApiKey(process.env.SENGRID_API_KEY);
    const msg = {
      to: newUserData.email,
      from: process.env.SENDGRID_VERIFIED_EMAIL,
      subject: "BioBloom Email Verification OTP",
      templateId: "d-c63310a7e75a47e5a31ed9c77a12aa18",
      dynamic_template_data: { otp: newUserData.otp },
    };
    await sgMail.send(msg);

    // create token
    const token = jwt.sign(
      {
        email: newUserData.email,
        name: newUserData.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    // add user
    await newUser.save();
    res.status(201).json({ message: "User created...", token: token });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e.message });
  }
}
// login
export async function userLogin(req, res) {
  try {
    const { email, passsword } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(409).json({ message: "User not found" });
    }

    // check password
    const isPasswordMatch = bcrypt.compare(passsword, user.password);
    if (!isPasswordMatch) {
      return res
        .status(409)
        .json({ message: "Email or Password is incorrect" });
    }

    // create token
    const token = jwt.sign(
      {
        email: user.email,
        name: user.password,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    res.status(200).json({
      message: "Login Successfully...",
      token: token,
      user: {
        email: user.email,
        name: user.name,
        avator: user.avator,
      },
    });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e.message });
  }
}
// otp verification
// forget password
// reset password

// user - laksararavindum@gmail.com user@123
