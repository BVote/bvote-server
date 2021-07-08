const mongoose = require("mongoose");

const citizenSchema = new mongoose.Schema(
    {
        cid: {
            type: String,
            required: true,
            index: { unique: true }
        },
        email: {
            type: String,
            required: true,
            index: { unique: true }
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const Citizen = mongoose.model("Citizen", citizenSchema);
module.exports = Citizen;