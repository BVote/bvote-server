const mongoose = require("mongoose");

const citizenSchema = new mongoose.Schema(
    {
        // cid: {
        //     type: String,
        //     required: true,
        //     index: { unique: true }
        // },
        // email: {
        //     type: String,
        //     required: true,
        //     index: { unique: true }
        // },
        // password: {
        //     type: String,
        //     required: true
        // },
        // avatar: {
        //     type: String
        // },
        pseudonym: {
            type: String,
            required: true,
            index: { unique: true }
        },
        confirmed: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true
    }
);

const Citizen = mongoose.model("Citizen", citizenSchema);
module.exports = Citizen;