const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  getAllTickets,
} = require("../controllers/ticketController");

router.route("/").get(protect, getTickets).post(protect, createTicket);
router.route("/all").get(getAllTickets);
router
  .route("/:id")
  .get(protect, getTicket)
  .put(protect, updateTicket)
  .delete(protect, deleteTicket);

module.exports = router;
