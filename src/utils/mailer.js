const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.BVOTE_MAILER_ADDR,
        pass: process.env.BVOTE_MAILER_PASS,
    }
});

const sendMail = (
    topic,
    message, 
    sender=process.env.BVOTE_MAILER_ADDR,
    receiver="<delijif498@eyeremind.com>"||"isaac2houngue@gmail.com"
    ) => {
    const mailConf = {
        from: sender,
        to: receiver,
        subject: topic,
        html: message,
        // text: message
    }
    transporter.sendMail(mailConf, function(error, info) {
        if(error) {
            console.log(error);
        } else {
            console.log("Email sent with succes: " + info.response);
        }
    });
}

module.exports = sendMail;


