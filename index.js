"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const apollo = require("./apollo.config");
const routes = require("./routes");
const { corsOptions } = require("./utils");

const port = process.env.PORT || 4000;
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors(corsOptions));
app.use("/", routes);

apollo.applyMiddleware({ app });

app.listen(port, () => console.log(`Listening on port: ${port}`));
