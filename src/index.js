require('dotenv').config()
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const depthLimit = require("graphql-depth-limit");
const { ApolloServer } = require("apollo-server-express");
const { createComplexityLimitRule } = require("graphql-validation-complexity");

const typeDefs = require("./gql-schema");
const models = require("./models");
const resolvers = require("./resolvers");
const database = require("./database");
const PORT = process.env.PORT || 4000;
const DB_STRING = process.env.DB_STRING;



const app = express();
// app.use(helmet());
app.use(cors());

const apolloServer = new ApolloServer(
    {
        typeDefs,
        resolvers,
        validation: [depthLimit(5), createComplexityLimitRule(1000)],
        context: async ({ req }) => {
            return { models };
            // return ;
        }
    }

);

database.connect(DB_STRING);

apolloServer.applyMiddleware({ app, path: "/server" });
app.listen({ port:PORT }, () => {
    console.log(`🚀 BVote@Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
});
