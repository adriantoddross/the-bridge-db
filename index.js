require("dotenv").config();
const express = require("express");
const mailchimp = require("./utils/mailchimp");

const apollo = require("./apollo.config");

const app = express();
const port = process.env.PORT || 4000;

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
    res.status(200);
  } else {
    res
      .status(400)
      .json({ error: "E-mail address wasn't provided or is invalid." });
  }
});

apollo.applyMiddleware({ app });

app.listen(port, () => console.log(`Listening on port: ${port}`));
