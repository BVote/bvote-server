const { gql } = require("apollo-server-express");
 
const typeDefs = gql`
    scalar DateTime
    
    type Citizen {
        id: ID!
        cid: String!
        email: String!
        firstnames: [String]
        lastnames: [String]
        birthdate: String!
        # avatar: [String]
    }

    type Query {
        hello: String
        identify(cid: String!, email:String!): Citizen
        me: Citizen!
    }

    type Mutation {
        notify(phone: String): Boolean
        # authenticate(nom et prénom)
    }
`;

module.exports = typeDefs;