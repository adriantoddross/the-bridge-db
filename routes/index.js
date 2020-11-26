"use strict";

const express = require("express");
const mailchimp = require("../utils/mailchimp");

const router = express.Router();

router.post("/subscribe", (req, res) => {
  const validEmailRegex = RegExp(
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
  );

  if (req.body.email && req.body.email.match(validEmailRegex)) {
    try {
      mailchimp.subscribeUser(req.body.email).then((response) => {
        res.status(200).json(response);
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res
      .status(400)
      .json({ error: "E-mail address is invalid or it wasn't provided." });
  }
});

module.exports = router;
