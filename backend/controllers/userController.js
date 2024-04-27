const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if all fields are provided
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All Fields Are Required");
  }

  // Validate email format
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Validate password format
  const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);

  // Existing User
  const userExisted = await User.findOne({ email });

  if (!validEmail) {
    res.status(400);
    throw new Error("Invalid Email");
  } else if (!validPassword) {
    res.status(400);
    throw new Error("Invalid Password");
  } else if (userExisted) {
    res.status(400);
    throw new Error("User Already Exist");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(500);
    throw new Error("User Registration Failed");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }

  const validatePassword = await bcrypt.compare(password, user.password);

  if (!validatePassword) {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

const getUser = (req, res) => {
    const { _id, name, email } = req.user;
    const user = { _id, name, email };
    res.status(200).json(user);
};

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
