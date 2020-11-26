"use strict";

require("dotenv").config();
const express = require("express");

const apollo = require("./apollo.config");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 4000;

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/", routes);

apollo.applyMiddleware({ app });

app.listen(port, () => console.log(`Listening on port: ${port}`));
