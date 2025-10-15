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

      templateId: "d-c63310a7e75a47e5a31ed9c77a12aa18",
      dynamic_template_data: {
        otp: newUserData.otp,
        subject: "BioBloom Email Verification OTP",
      },
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
export async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;

    // check email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(409).json({ message: "User not found..." });
    }

    // compare otp
    if (user.otp != otp) {
      return res.status(401).json({ message: "Incorrect OTP" });
    }

    // check new account or old
    if (!user.isActive) {
      // account active
      await User.findOneAndUpdate({ email }, { isActive: true });

      // create welcome email
      const msg = {
        to: user.email,
        from: process.env.SENDGRID_VERIFIED_EMAIL,
        templateId: "d-8c671df67f99487b84e1dd27aa35d414",
        dynamic_template_data: {
          name: user.name,
          website_url: "",
          subject: "Welcome to Bioloom",
        },
      };
      // send welcome email
      sgMail.setApiKey(process.env.SENGRID_API_KEY);
      await sgMail.send(msg);

      res.status(200).json({ message: "Account Verified..." });
    } else {
      res.status(200).json({ message: "Email Verified..." });
    }
  } catch (e) {
    res.status(500).json({ message: "Error...", error: e.message });
  }
}

// reset password - verify email
export async function verifyEmail(req, res) {
  try {
    const { email } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(409).json({ message: "Email not Found..." });
    }

    // update otp
    const newOtp = generateOtp();
    await User.findOneAndUpdate({ email }, { otp: newOtp });

    // create otp email
    sgMail.setApiKey(process.env.SENGRID_API_KEY);
    const msg = {
      to: user.email,
      from: process.env.SENDGRID_VERIFIED_EMAIL,
      templateId: "d-c63310a7e75a47e5a31ed9c77a12aa18",
      dynamic_template_data: {
        otp: newOtp,
        subject: "Verify Your Email",
      },
    };
    await sgMail.send(msg);
    res.status(201).json({ message: "OTP Send succussfully..." });
  } catch (e) {
    res.status(500).json({ message: "Error...", error: e.message });
  }
}

// reset password
export async function resetPassword(req, res) {
  try {
    const { email, password } = req.body;

    // find user
    const user = User.findById({ email });
    if (!user) {
      return res.status(409).json({ message: "User not found..." });
    }

    // password salt & hash
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    // update password
    await User.findOneAndUpdate({ email }, { password: newPassword });

    res.status(201).json({ message: "Password Updated..." });
  } catch (e) {
    res.status(500).json({ message: "Error...", error: e.message });
  }
}

// user - laksararavindum@gmail.com user@123
