const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");
const crypto = require("crypto");
const { validateEmail } = require("../email/isValidEmail");
const { sendResetPasswordEmail, sendVerificationEmail } = require("../email/sendEmail");

function generateSecureToken(length) {
    return crypto.randomBytes(length).toString("base64").slice(0, length);
  }

const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      farmSize,
      experience,
      password,
    } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists, please login",
        success: false,
      });
    }

    const isValidEmail = await validateEmail(email);
    if (isValidEmail === false) {
      return res.status(400).json({ message: "Invalid email address", success: false });
    } else if (isValidEmail === "Unable to validate email") {
      return res.status(500).json({ message: "Internal Server Error", success: false });
    }

    const emailVerificationToken = generateSecureToken(500);
    const emailVerificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const emailVerificationUrl = `http://localhost:3000/verifyEmail?token=${encodeURIComponent(emailVerificationToken)}`;
    const response = await sendVerificationEmail(email, `${firstName} ${lastName}`, emailVerificationUrl);

    if (!response) {
      return res.status(500).json({ message: "Failed to send verification email Please try again later", success: false });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      phone,
      address,
      farmSize,
      experience,
      password: hashedPassword,
      isVerified: false,
      emailVerificationToken,
      emailVerificationTokenExpires,
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful Please check your email to verify your account",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "Authentication failed: Email or password is incorrect",
        success: false,
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        message: "Authentication failed: Email or password is incorrect",
        success: false,
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email to login",
        success: false,
      });
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { _id: user._id, email: user.email, firstName: user.firstName },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      success: true,
      jwtToken,
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      farmSize: user.farmSize,
      experience: user.experience,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err.message,
    });
  }
};

const verifyEmail = async (req, res) => {
    if (!req.query.token) return res.status(400).json({ success: false, message: "Token is required" });
    try {
      const user = await UserModel.findOne({ emailVerificationToken: req.query.token });
      if (!user || user.emailVerificationTokenExpires < new Date()) {
        return res.status(400).json({ success: false, message: "Invalid or expired token" });
      }
      await UserModel.updateOne({ emailVerificationToken: req.query.token }, { isVerified: true, emailVerificationToken: "", emailVerificationTokenExpires: "" });
      res.status(200).json({ success: true, message: "Email verified successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

const sendResetPasswordLink = async (req, res) => {
  if (!req.body.email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const passwordResetToken = generateSecureToken(500);
    const passwordResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000);
    await UserModel.updateOne(
      { email: req.body.email },
      { $set: { passwordResetToken, passwordResetTokenExpires } }
    );
    const response = await sendResetPasswordEmail(
      req.body.email,
      `${user.firstName} ${user.lastName}`,
      `http://localhost:3000/resetpassword?token=${encodeURIComponent(
        passwordResetToken
      )}`
    );

    if (!response) {
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
    res
      .status(200)
      .json({ success: true, message: "Password reset link sent" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  if (!req.body.token || !req.body.password) {
    return res
      .status(400)
      .json({ success: false, message: "Token and password are required" });
  }
  try {
    const passwordResetToken = decodeURIComponent(req.body.token);
    const user = await UserModel.findOne({ passwordResetToken });
    if (
      !user ||
      !user.passwordResetToken ||
      !user.passwordResetTokenExpires ||
      user.passwordResetTokenExpires < new Date()
    ) {
      return res
        .status(404)
        .json({ success: false, message: "Password reset link is expired" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await UserModel.updateOne(
      { passwordResetToken },
      {
        $set: { password: hashedPassword, token: "" },
        $unset: { passwordResetToken: "", passwordResetTokenExpires: "" },
      }
    );
    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  signup,
  login,
  verifyEmail,
  sendResetPasswordLink,
  resetPassword,
};
