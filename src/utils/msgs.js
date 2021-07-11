module.exports = {
    mails: {
        confirmation: {
            subject: "BVote Verification Email",
            text: ({ firstname, lastname }) => {
                return (`Hi ${firstname} ${lastname}, \nWelome to to BVoting the secure voting plateforme`);
            },
            html: ({ firstname, lastname, link }) => {
                return (`
                    
                    Hi <strong>${firstname} ${lastname} 😊</strong>!, <br/><br/>
                    <pre>
                    </pre>
                    Welcome to <i><strong style="color:#0059FF"> BVote, </strong></i>  the secure voting plateforme <br/><br/>
                     <pre>
                    </pre>
                    Please <strong style="color:#0059FF">click</strong>  on this link 👉 <a href="${link}"> ${link} <a/> to confirm your identity as the real you (${firstname} ${lastname}).
                    
                `);
            }
        }
    }
    
};


