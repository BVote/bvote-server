
const twilio = require("twilio");
twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendTwilioAlert = async (receiver="+22961734517") => {
    
    return await twilioClient.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: receiver,
        body: "You just send a sms from Bvote"
    })
    .then((message) => console.log(message.sid))
    .catch(err => console.log(err));
}

// twilioClient.messages.create({
//     from: process.env.TWILIO_PHONE_NUMBER,
//     to: "+229 61740074",
//     body: "You just send an sms from Bvote"
// })
// .then((message) => console.log(message.sid))
// .catch(err => console.log(err));

module.exports = sendTwilioAlert;