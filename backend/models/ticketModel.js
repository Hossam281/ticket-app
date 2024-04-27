const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Users",
        },
        title: {
            type: String,
            required: [true, "Please add a title"],
        },
        userName: {
            type: String,
            required: [true, "Please add a user name"],
        },
        userEmail: {
            type: String,
            required: [true, "Please add an email"],
        },
        product: {
            type: String,
            required: [true, "Please select a product"],
            validate: {
                validator: (value) => {
                    const lowerCaseValue = value.toLowerCase();
                    const possibleValues = ["android", "ios", "web", "windows", "macos", "linux"];
                    return possibleValues.includes(lowerCaseValue);
                },
                message: "Invalid product value. Please select a valid product.",
            },
        },
        description: {
            type: String,
            required: [true, "Please enter a description of the issue"],
        },
        status: {
            type: String,
            required: true,
            enum: ["new", "open", "closed"],
            default: "new",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Tickets", ticketSchema);