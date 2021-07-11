require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyUserJWToken = token => {
    if(token) {
        try {
            // return user data from "token"
            return jwt.verify(token, process.env.JWT_STRING);
        } catch (error) {
            throw new Error("Error- Session invalid");
        }
    }
};

const getSignedUserJWToken = (citizen) => {
    // return JWT token
    return jwt.sign(citizen, process.env.JWT_STRING);
};


module.exports = { verifyUserJWToken, getSignedUserJWToken }; 