
# Fullstack Ticket Web Application

This is a fullstack ticket web application that implements CRUD operations using MongoDB, Mongoose, Express, JWT authorization in the backend, and React with TypeScript, Headless UI, and Tailwind CSS in the frontend.

## Features
- User Authentication: Users can register, login, and logout.
- Ticket Management: Users can create, read, update, and delete tickets.
- Authorization: Only authenticated users can access certain routes.
- Responsive Design: The application is designed to work on both desktop and mobile devices.

# Technologies Used

## Backend
- Node.js: JavaScript runtime for the backend.
- Express: Web framework for Node.js.
- MongoDB: NoSQL database for storing ticket information.
- Mongoose: MongoDB object modeling for Node.js.
- JWT: JSON Web Tokens for user authentication.

## Frontend
- React: JavaScript library for building user interfaces.
- TypeScript: Typed superset of JavaScript for improved code quality.
- Headless UI: Collection of composable React components for  building accessible UIs.
- Tailwind CSS: Utility-first CSS framework for styling the application.


# API Endpoints
- ``` POST /api/users/register```: Register a new user.
- ```POST /api/users/login```: Login a user.
- ```GET /api/tickets/all```: Get all tickets.
- ```GET /api/tickets/:id```: Get a ticket by ID.
- ```POST /api/tickets```: Create a new ticket.
- ```GET /api/tickets```: Get an authorized user tickets.
- ```PUT /api/tickets/:id```: Update a ticket by ID.
- ```DELETE /api/tickets/:id```: Delete a ticket by ID.

# Live Demo:
https://ticket-app-gilt.vercel.app/
