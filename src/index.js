require('dotenv').config()
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const depthLimit = require("graphql-depth-limit");
const { ApolloServer } = require("apollo-server-express");
const { createComplexityLimitRule } = require("graphql-validation-complexity");
const bcrypt = require("bcrypt");

const { verifyUserJWToken } = require("./utils/jwtoken");
const typeDefs = require("./gql-schema");
const models = require("./models");
const resolvers = require("./resolvers");
const database = require("./database");
const PORT = process.env.PORT || 4000;
const DB_STRING = process.env.DB_STRING;

// sendTwilioAlert();

const app = express();
// app.use(helmet());
app.use(cors());

const apolloServer = new ApolloServer(
    {
        typeDefs,
        resolvers,
        validation: [depthLimit(5), createComplexityLimitRule(1000)],
        context: async ({ req }) => {
            const token = req.headers.authorization;
            const currentCitizenIdentity = await verifyUserJWToken(token);
            return { models, currentCitizenIdentity };
        }
    }

);

database.connect(DB_STRING);


app.get('/confirm/:token', async function (req, res, next) {

    try {
        const citizenIdentity = verifyUserJWToken(req.params.token);
        console.log(citizenIdentity);
        console.log(process.env.BCRYPT_SALT_ROUNDS);
        const pseudonym = await bcrypt.hash(citizenIdentity.cid, parseInt(process.env.BCRYPT_SALT_ROUNDS));
        const newCitizen = await models.Citizen.create({
            pseudonym: pseudonym,
            confirmed: true
        })
        console.log(newCitizen);
        // return res.redirect(process.env.FRONTEND_URL);
        res.send(citizenIdentity);

    } catch (error) {
        res.send(`
            <h2> Email confirmation error </h2>
        `);
        console.log(error);
    }
    // pass control to the next handler
    next(); 
  });

apolloServer.applyMiddleware({ app, path: "/server" });
app.listen({ port:PORT }, () => {
    console.log(`🚀 BVote@Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
});
