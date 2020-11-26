const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./types");
const resolvers = require("./resolvers");

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    reportSchema: true,
    variant: "current",
  },
});

module.exports = server;
