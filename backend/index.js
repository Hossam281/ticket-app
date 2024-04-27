const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connect=require('./config/db')
const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const PORT = process.env.PORT || 6000;
const app = express();

connect()

// Express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);

// Error handler middleware
app.use(errorHandler);

app.get('/', (req, res) => res.send('Server is running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
