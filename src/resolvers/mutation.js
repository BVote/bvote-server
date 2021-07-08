require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { AuthenticationError, ForbiddenError } = require("apollo-server-express");


const gravatar = require("../utils/gravatar");

module.exports = {
    notify: async (parent, args, { models, userInformation }) => {
        // check for user information in the context
        if(!userInformation) {
            throw new AuthenticationError("Error- You must identify first");
        }
        // send sms
        // return await models.Note.create({
        //     content: args.content,
        //     author: mongoose.Types.ObjectId(userInformation.id)
        // });
    },
};
