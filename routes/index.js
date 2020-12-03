"use strict";

const express = require("express");
const mailchimp = require("../utils/mailchimp");

const router = express.Router();

router.post("/subscribe", (req, res) => {
  const { email } = req.body;
  const validEmailRegex = RegExp(
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
  );

  if (!req.body) {
    res.status(400).json({ error: "Request body is empty." });
  } else if (!email) {
    res
      .status(400)
      .json({ error: "E-mail address is missing in request body." });
  } else {
    if (email.match(validEmailRegex)) {
      mailchimp.subscribeUser(req.body.email).then((response) => {
        res.status(200).json(response);
      });
    } else {
      res.status(400).json({ error: "E-mail address is invalid." });
    }
  }
});

module.exports = router;
