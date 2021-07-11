const fetch = require("isomorphic-fetch");
const bcrypt = require("bcrypt");

const { mails } = require("../utils/msgs");
const sendTwilioAlert = require("../utils/messenger");
const sendEmail = require("../utils/mailer");
const { getSignedUserJWToken, verifyUserJWToken } = require("../utils/jwtoken");

const confirmationBaseURL = (`http://localhost:${process.env.PORT}/confirm/`||`http://localhost:${process.env.PORT}/confirm/`);

module.exports = {
        identify: async (parent, { cid, email }, { models }) => {
            let citizenIdentity = undefined;

            await fetch(process.env.RAVIP_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type":"application/json" },
                body: JSON.stringify(
                    { query: `
                        query {
                            getCitizenByCidAndEmail(cid: "${cid}", email: "${email}") {
                                cid
                                firstnames
                                lastnames
                                telephones
                            }
                        }`
                    }
                ),
            })
            .then(res => res.json())
            .then(async res => {
                console.log("Before fetching citizenIdentity");
                citizenIdentity = res.data.getCitizenByCidAndEmail;
                const token = getSignedUserJWToken(citizenIdentity);
                const confirmationMailSubject = mails.confirmation.subject;
                const confirmationMailBody = mails.confirmation.html({
                    firstname: citizenIdentity.firstnames[0], 
                    lastname: citizenIdentity.lastnames[0],
                    link: confirmationBaseURL+token
                });
                
                // sendTwilioAlert();
                sendEmail(confirmationMailSubject, confirmationMailBody);
                
            })
            .catch(error => console.error(error));


            return citizenIdentity;
            // rpc
            // return await models.Citizen.findOne(
            //     { cid, email }
            // );
        },
    
        me: async (parent, args, { models, currentCitizenIdentity }) => {
            // find a user given the curent user context
            return await models.Citizen.findById(currentCitizenIdentity.id);
        }
    }