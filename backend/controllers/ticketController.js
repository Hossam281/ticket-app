const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");

// Get all tickets
const getAllTickets = asyncHandler(async (req, res) => {
  // Check if the page and limit query parameters are valid numbers
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  if (isNaN(page) || isNaN(limit)) {
    res.status(400);
    throw new Error("Invalid page or limit query parameter");
  }

  // Check if the page and limit query parameters are within acceptable ranges
  if (page < 1 || limit < 1 || limit > 100) {
    res.status(400);
    throw new Error("Invalid page or limit query parameter");
  }

  // Check if the user has permission to view all tickets

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const totalTickets = await Ticket.countDocuments();

  const tickets = await Ticket.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(startIndex);

  // Pagination result
  const pagination = {};
  if (endIndex < totalTickets) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit: limit,
    };
  }

  res.status(200).json({
    success: true,
    count: totalTickets,
    pagination,
    data: tickets,
  });
});

// Get all tickets for the logged-in user
const getTickets = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  // Find all tickets associated with the user
  const tickets = await Ticket.find({ user: req.user.id });

  // Check if user exists
  if (!user) {
    res.status(400);
    throw new Error("User Not Found");
  }

  // Check if tickets were found
  if (!tickets) {
    res.status(400);
    throw new Error("No Tickets Found");
  }

  res.status(200).json(tickets);
});

// Get a single ticket by ID
const getTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  // Check if ticket exists
  if (!ticket) {
    res.status(400);
    throw new Error("No Ticket Found");
  }

  // Check if user exists

  res.status(200).json(ticket);
});

// Create a new ticket
const createTicket = asyncHandler(async (req, res) => {
  const { product, description, title } = req.body;
  const user = await User.findById(req.user.id);
  const enums = ["android", "ios", "web", "windows", "macos", "linux"];
  const validProduct = enums.includes(product.toLowerCase());

  // Check if product is valid
  if (!validProduct) {
    res.status(400);
    throw new Error("Please select a valid product");
  }

  // Check if user exists
  if (!user) {
    res.status(400);
    throw new Error("User Not Found");
  }

  // Check if product and description are provided
  if (!product || !description || !title) {
    res.status(400);
    throw new Error("Please add a product, description and title");
  }

  // Create the ticket
  const ticket = await Ticket.create({
    user: req.user.id,
    title,
    userName: user.name,
    userEmail: user.email,
    product: req.body.product,
    description,
    status: "new",
  });

  res.status(201).json(ticket);
});

// Update a ticket by ID
const updateTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  const { product, status, description, title } = req.body;
  const productEnums = ["android", "ios", "web", "windows", "macos", "linux"];
  const validProduct = productEnums.includes(product);
  const statusEnums = ["new", "open", "closed"];
  const validStatus = statusEnums.includes(status);

  // Check if product is valid
  if (!validProduct) {
    res.status(400);
    throw new Error("Please select a valid product");
  }

  // Check if description is provided
  if (!description) {
    res.status(400);
    throw new Error("Please add a description");
  }

  // Check if title is provided
  if (!title) {
    res.status(400);
    throw new Error("Please add a title");
  }

  // Check if status is valid
  if (!validStatus) {
    res.status(400);
    throw new Error("Please select a valid status");
  }

  // Check if ticket exists
  if (!ticket) {
    res.status(400);
    throw new Error("No Ticket Found");
  }

  // Check if the ticket belongs to the logged-in user
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  // Update the ticket
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    { ...req.body, status: req.body.status.toLowerCase() },
    { new: true }
  );

  res.status(200).json(updatedTicket);
});

// Delete a ticket by ID
const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  // Check if ticket exists
  if (!ticket) {
    res.status(404);
    throw new Error("No Ticket Found");
  }

  // Check if the ticket belongs to the logged-in user
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  // Remove the ticket
  await Ticket.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true });
});

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  getAllTickets,
};
