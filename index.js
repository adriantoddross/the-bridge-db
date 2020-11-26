require("dotenv").config();
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const mailchimp = require("./utils/mailchimp");
const mailchimpAPI = require("./utils/mailchimp");

const app = express();
const port = process.env.PORT || 4000;

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
};

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/subscribe", (req, res) => {
  res.status(200).send(req.body);

  const validEmailRegex = RegExp(
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
  );

  if (req.body.email && req.body.email.match(validEmailRegex)) {
    mailchimp.subscribeUser(req.body.email);
  } else {
    res
      .status(400)
      .json({ error: "E-mail address wasn't provided or is invalid." });
  }
});

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

server.applyMiddleware({ app });

app.listen(port, () => console.log(`Listening on port: ${port}`));
mailchimp.init();
